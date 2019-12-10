import * as request from "request-promise";
import { HeadlineStatusBar, updateStatus } from "./components/Headline.statusbar";
import { displayWarning } from "./display";
import { getSource, getApiKey, isCredsValid } from "./credentials";

interface HeadlinesInfo {
    articles: [
        {
            source : {
                name: string
            },
            title: string,
            url: string
        }
    ];
}

export let headlinesInfo: HeadlinesInfo | null = null;

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
        }) as HeadlinesInfo;

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




