import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Headlines has started...');

	vscode.commands.registerCommand('extension.addExplorerViews', () => {
        vscode.commands.executeCommand('setContext', 'headlinesEnabled', true);
		//vscode.window.showInformationMessage('Ready to update?');
    });

    vscode.commands.registerCommand('extension.removeExplorerViews', () => {
        vscode.commands.executeCommand('setContext', 'headlinesEnabled', false);
		//vscode.window.showInformationMessage('Ready to update?');
    });


}

export function deactivate() {}