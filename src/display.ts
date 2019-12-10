import { window } from "vscode";
import {updateHeadlines} from "./newsapi";
import {HeadlineStatusBar} from "./components/Headline.statusbar";
import {LinkStatusBar} from "./components/Link.statusbar";
import { getSource, getApiKey, udpdateSource, updateApiKey, isCredsValid } from "./credentials";

export const displayTutorial = () => {
    HeadlineStatusBar.text = '📰 Set source and API Key';
    HeadlineStatusBar.show();
    LinkStatusBar.hide();
};

export const displayWarning = () => {
    HeadlineStatusBar.text = '⚠️ Headlines Unavailable';
    HeadlineStatusBar.show();
    LinkStatusBar.hide();
};

export const promptConfig = async () => {
    const _source = await window.showInputBox({
        value: getSource(),
        ignoreFocusOut: true,
        prompt: 'News source. i.e. techcrunch'
    });
    udpdateSource(_source);

    const _apiKey = await window.showInputBox({
        value: getApiKey(),
        ignoreFocusOut: true,
        prompt: 'API Key for newsapi.org'
    });
    updateApiKey(_apiKey);

    if (!isCredsValid()) { displayTutorial();
    } else {
        updateHeadlines();
    }
};

