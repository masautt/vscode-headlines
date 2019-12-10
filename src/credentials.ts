import { workspace, ConfigurationTarget, window } from 'vscode';
import { LinkStatusBar } from "./ui/Link.statusbar";
import { HeadlineStatusBar } from "./ui/Headline.statusbar";

export let source :string | undefined = workspace.getConfiguration('Headlines').get<string>('source');
export let apiKey :string | undefined = workspace.getConfiguration('Headlines').get<string>('key');

export const udpdateSource = (newSource: string | undefined) : void => {
    source = newSource;
    workspace.getConfiguration('Headlines').update('source', newSource, ConfigurationTarget.Global);
};

export const updateApiKey = (newKey: string | undefined) : void =>  {
    apiKey = newKey;
    workspace.getConfiguration('Headlines').update('key', newKey, ConfigurationTarget.Global);
};


export const isCredsValid = () : boolean => {
    if (source !== undefined && apiKey !== undefined && source !== "" && apiKey !== "") {return true;}
    return false;
};

export const getSource = () : string | undefined => source;
export const getApiKey = () : string | undefined => apiKey;



