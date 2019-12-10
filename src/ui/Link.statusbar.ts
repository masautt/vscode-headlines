import { StatusBarAlignment, window } from 'vscode';
import {headlinesInfo} from "../newsapi";
import {env, Uri} from "vscode";
import {articleNum} from "./Headline.statusbar";
export const LinkStatusBar = window.createStatusBarItem(StatusBarAlignment.Left, -9);

export const openLink = () : void => {
    if (headlinesInfo !== null) {

        env.openExternal(Uri.parse(headlinesInfo.articles[articleNum].url));
    }
    return;
};