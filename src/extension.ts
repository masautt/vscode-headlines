'use strict';

import { ExtensionContext, window, commands, env, Uri  } from 'vscode';
import * as request from "request-promise";
import { HeadlinesInfo } from "./Headlines.interface";
import { LinkStatusBar } from "./ui/Link.statusbar";
import { HeadlineStatusBar } from "./ui/Headline.statusbar";
import { udpdateSource, updateApiKey, getSource, getApiKey, isCredsValid } from "./credentials";

let articleNum = 0;
let headlinesInfo: HeadlinesInfo | null = null;

export const activate = (context: ExtensionContext) : void => {
    HeadlineStatusBar.command = isCredsValid() ? 'headlines.nextArticle' : "headlines.updateConfig";
    LinkStatusBar.command = 'headlines.openArticle';

    context.subscriptions.push(
        HeadlineStatusBar,
        LinkStatusBar,
        commands.registerCommand('headlines.nextArticle', nextArticle),
        commands.registerCommand('headlines.openArticle', openArticle),
        commands.registerCommand('headlines.updateConfig', promptConfig));

    if (!isCredsValid()) {
        HeadlineStatusBar.text = '📰 Set source and API Key';
        HeadlineStatusBar.tooltip = 'Headlines';
        HeadlineStatusBar.show();
        LinkStatusBar.hide();
    }
    else {
        updateHeadlines();
    }


    //setInterval(updateHeadlines, 100 * 1000);
};

const promptConfig = async () => {
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

    if (!isCredsValid()) {
        HeadlineStatusBar.text = '📰 Set Source and API Key';
        HeadlineStatusBar.tooltip = 'Headlines';
        HeadlineStatusBar.show();
        LinkStatusBar.hide();
    } else {
        updateHeadlines();
    }
};

const nextArticle = () : void => {
    if (!isCredsValid()) {
        promptConfig();
        return;
    }

    updateStatus();
};

const openArticle = () : void => {
    if (headlinesInfo !== null) {

        env.openExternal(Uri.parse(headlinesInfo.articles[articleNum].url));
    }
    return;
};

const updateHeadlines = async ()  => {
    HeadlineStatusBar.command = isCredsValid() ? 'headlines.nextArticle' : "headlines.updateConfig";
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

const updateStatus = () => {
    if (headlinesInfo !== null) {
        articleNum++;

        let articlesLength = headlinesInfo.articles.length;

        if (articleNum >= articlesLength) {
            articleNum = 0;
        }

        let articleSource = headlinesInfo.articles[articleNum].source.name;
        let articleTitle = headlinesInfo.articles[articleNum].title;
    
        HeadlineStatusBar.text = `${articleSource} 📰 ${articleTitle}`;
        HeadlineStatusBar.show();

        LinkStatusBar.text = "🔗";
        LinkStatusBar.show();
    }

};
