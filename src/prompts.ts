import { window } from "vscode";
import {updateHeadlines} from "./requests";
import { getSource, getApiKey, udpdateSource, updateApiKey, isCredsValid } from "./credentials";
import { displayTutorial } from "./displays";

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
