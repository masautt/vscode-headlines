
import {HeadlineStatusBar} from "./components/Headline.statusbar";
import {LinkStatusBar} from "./components/Link.statusbar";

export const displayTutorial = () => {
    HeadlineStatusBar.text = '📰 Set source and API Key';
    HeadlineStatusBar.show();
    LinkStatusBar.hide();
};

export const displayWarning = () => {
    HeadlineStatusBar.text = '⚠️ Source / API Key not valid';
    HeadlineStatusBar.show();
    LinkStatusBar.hide();
};


