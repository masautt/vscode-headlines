'use strict';

import { ExtensionContext, StatusBarAlignment, ConfigurationTarget, window, commands, workspace,  } from 'vscode';
import * as request from "request-promise";

interface HeadlinesInfo {
    articles: [
        {
            source : {
                name: string
            },
            title: string
        }
    ];
}

let articleNum = 0;
let headlinesInfo: HeadlinesInfo | null = null;
let source = workspace.getConfiguration('Headlines').get<string>('source');
let apiKey = workspace.getConfiguration('Headlines').get<string>('key');

const articleViewBar = window.createStatusBarItem(StatusBarAlignment.Left, -10);

export const activate = (context: ExtensionContext) : void => {
    articleViewBar.command = 'headlines.nextArticle';
    context.subscriptions.push(articleViewBar);

    context.subscriptions.push(commands.registerCommand('headlines.nextArticle', () => {
        nextArticle();
    }));

    context.subscriptions.push(commands.registerCommand('headlines.updateConfig', () => {
        updateConfig();
    }));

    if (!source || !apiKey) {
        articleViewBar.text = '🌎 Set source and API Key';
        articleViewBar.tooltip = 'Headlines';
        articleViewBar.show();
    }

    updateHeadlines();
    setInterval(updateHeadlines, 100 * 1000);
};

const udpdateSource = (newSource: string | undefined) : void => {
    source = newSource;
    workspace.getConfiguration('Headlines').update('source', newSource, ConfigurationTarget.Global);
};

const updateApiKey = (newKey: string | undefined) : void =>  {
    apiKey = newKey;
    workspace.getConfiguration('Headlines').update('key', newKey, ConfigurationTarget.Global);
};

const updateConfig = async () => {
    const _source = await window.showInputBox({
        value: source,
        ignoreFocusOut: true,
        prompt: 'News source. i.e. techcrunch'
    });
    udpdateSource(_source);
    const _apiKey = await window.showInputBox({
        value: apiKey,
        ignoreFocusOut: true,
        prompt: 'API Key for newsapi.org'
    });
    updateApiKey(_apiKey);

    if (!source || !apiKey) {
        articleViewBar.text = 'ℹ️ Set Source and API Key';
        articleViewBar.tooltip = 'Headlines';
        articleViewBar.show();
    } else {
        updateHeadlines();
    }
};

const nextArticle = () : void => {
    if (!source || !apiKey) {
        updateConfig();
        return;
    }

    updateStatus();
};

const updateHeadlines = async ()  => {
    if (!source || !apiKey) {
        return;
    }
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

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
            articleViewBar.text = '⚠️ Headlines Unavailable';
            articleViewBar.show();
        }
    } catch (err) {
        headlinesInfo = null;
        articleViewBar.text = '⚠️ Headlines Unavailable';
        articleViewBar.show();
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
    
        articleViewBar.text = `${articleSource} 📰 ${articleTitle}`;
        articleViewBar.show();
    }

};
