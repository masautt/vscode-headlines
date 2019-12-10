import * as request from "request-promise";
import { HeadlineStatusBar, updateStatus } from "./ui/Headline.statusbar";
import { HeadlinesInfo } from "./Headlines.interface";
import { getSource, getApiKey, isCredsValid } from "./credentials";


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
            HeadlineStatusBar.text = '⚠️ Headlines Unavailable';
            HeadlineStatusBar.show();
        }
    } catch (err) {
        headlinesInfo = null;
        HeadlineStatusBar.text = '⚠️ Headlines Unavailable';
        HeadlineStatusBar.show();
    }
};

