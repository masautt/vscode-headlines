import { StatusBarAlignment, window, } from 'vscode';
import { LinkStatusBar } from "./Link.statusbar";
import { headlinesInfo } from "../requests";
import { isCredsValid } from "../credentials";
import { promptConfig } from "../prompts";

export const HeadlineStatusBar  = window.createStatusBarItem(StatusBarAlignment.Left, -10);

export let articleNum = 0;

export const updateStatus = () => {
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

export const nextHeadline = () : void => {
    if (!isCredsValid()) {
        promptConfig();
        return;
    }

    updateStatus();
};