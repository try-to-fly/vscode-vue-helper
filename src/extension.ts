'use strict';
import * as vscode from 'vscode';
import createTemplate from './libs/create-template'

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.createVueTemplate', target => {
        const {fsPath} = target
        createTemplate(fsPath)
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}