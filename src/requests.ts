import * as request from "request-promise";
import { HeadlineStatusBar, updateStatus } from "./components/Headline.statusbar";
import { displayWarning } from "./displays";
import { getSource, getApiKey, isCredsValid } from "./credentials";
import { HeadlinesNode } from "./data/Headlines.node";

export let headlinesInfo: HeadlinesNode | null = null;

export const updateHeadlines = async ()  => {
    if (!isCredsValid()) {
        return;
    }

    HeadlineStatusBar.command = 'headlines.nextHeadline';
    let apiUrl = `https://newsapi.org/v2/top-headlines?sources=${getSource()}&apiKey=${getApiKey()}`;

    try {
        const info = await request({
            uri: apiUrl,
            json: true
        }) as HeadlinesNode;

        if (info) {
            headlinesInfo = info;
            updateStatus();
        } else {
            headlinesInfo = null;
            displayWarning();
        }
    } catch (err) {
        headlinesInfo = null;
        displayWarning();
    }
};




