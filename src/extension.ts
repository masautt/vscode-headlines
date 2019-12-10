'use strict';

import { ExtensionContext, commands } from 'vscode';
import { LinkStatusBar, openLink } from "./components/Link.statusbar";
import { HeadlineStatusBar, nextHeadline } from "./components/Headline.statusbar";
import { displayTutorial,  promptConfig } from "./display";
import { isCredsValid } from "./credentials";
import { updateHeadlines } from "./newsapi";

export const activate = (context: ExtensionContext) : void => {
    HeadlineStatusBar.command = isCredsValid() ? 'headlines.nextHeadline' : "headlines.promptConfig";
    LinkStatusBar.command = 'headlines.openLink';

    context.subscriptions.push(
        HeadlineStatusBar,
        LinkStatusBar,
        commands.registerCommand('headlines.nextHeadline', nextHeadline),
        commands.registerCommand('headlines.openLink', openLink),
        commands.registerCommand('headlines.promptConfig', promptConfig));

    if (!isCredsValid()) {
        displayTutorial();
    }
    else {
        updateHeadlines();
    }


    //setInterval(updateHeadlines, 100 * 1000);
};







