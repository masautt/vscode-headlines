'use strict';

import { ExtensionContext, commands } from 'vscode';
import { LinkStatusBar, openLink } from "./ui/Link.statusbar";
import { HeadlineStatusBar, nextHeadline } from "./ui/Headline.statusbar";
import { promptConfig, isCredsValid } from "./credentials";
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







