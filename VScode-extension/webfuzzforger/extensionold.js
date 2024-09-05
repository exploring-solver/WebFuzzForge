const vscode = require('vscode');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const fs = require('fs');

function activate(context) {
    // Create the view container in the activity bar
    const view = vscode.window.createTreeView('webFuzzForgerView', {
        treeDataProvider: new WebFuzzForgerProvider(),
        showCollapseAll: true
    });

    // Register the command for opening the webview
    const webviewCommand = vscode.commands.registerCommand('webFuzzForger.openWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'webFuzzForger',
            'WebFuzzForger',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(context.extensionPath)]
            }
        );

        panel.webview.html = getWebviewContent(context, panel);

        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'startVulnerabilityDetection':
                    startVulnerabilityDetection(panel);
                    break;
                case 'uploadCode':
                    // Logic for uploading code will be implemented later
                    break;
            }
        });
    });

    context.subscriptions.push(webviewCommand);
}

class WebFuzzForgerProvider {
    getTreeItem(element) {
        return element;
    }

    getChildren() {
        return Promise.resolve([
            new TreeItem('Open WebFuzzForger', vscode.TreeItemCollapsibleState.None, {
                command: 'webFuzzForger.openWebview',
                title: 'Open WebFuzzForger'
            })
        ]);
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.command = command;
    }
}

function getWebviewContent(context, panel) {
    const scriptPathOnDisk = vscode.Uri.file(
        path.join(context.extensionPath, 'media', 'script.js')
    );
    const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

    return `
    <html>
        <body>
            <h1>WebFuzzForger</h1>
            <button id="startDetection">Start Vulnerability Detection</button>
            <br><br>
            <input type="file" id="upload" />
            <br><br>
            <div id="reportContainer"></div>
            <script>
                const vscode = acquireVsCodeApi();
                
                document.getElementById('startDetection').addEventListener('click', () => {
                    vscode.postMessage({ command: 'startVulnerabilityDetection' });
                });

                document.getElementById('upload').addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        const content = evt.target.result;
                        vscode.postMessage({ command: 'uploadCode', content });
                    };
                    reader.readAsText(file);
                });

                window.addEventListener('message', event => {
                    const message = event.data; // The JSON data from the extension
                    if (message.command === 'updateReport') {
                        document.getElementById('reportContainer').innerHTML = message.content;
                    }
                });
            </script>
        </body>
    </html>`;
}

function startVulnerabilityDetection(panel) {
    const watcher = chokidar.watch(vscode.workspace.rootPath, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
    });

    watcher
        .on('add', path => {
            // vscode.window.showInformationMessage(`New file added: ${path}`);
            // checkForVulnerabilities(path);
        })
        .on('change', path => {
            vscode.window.showInformationMessage(`File changed: ${path}`);
            if (path.endsWith('package.json') || path.endsWith('requirements.txt')) {
                vscode.window.showInformationMessage('Running Dependency-Check...');
                runDependencyCheck(path, reportPath => {
                    // Load and display the report in the webview
                    const reportContent = fs.readFileSync(reportPath, 'utf8');
                    panel.webview.postMessage({
                        command: 'updateReport',
                        content: generateReportHtml(JSON.parse(reportContent))
                    });
                });
            }
        })
        .on('unlink', path => {
            vscode.window.showWarningMessage(`File deleted: ${path}`);
        })
        .on('addDir', path => {
            // vscode.window.showInformationMessage(`New directory added: ${path}`);
        })
        .on('unlinkDir', path => {
            vscode.window.showWarningMessage(`Directory deleted: ${path}`);
        })
        .on('error', error => {
            vscode.window.showErrorMessage(`Watcher error: ${error}`);
        })
        .on('ready', () => {
            vscode.window.showInformationMessage('Initial scan complete. Watching for changes...');
        });

    vscode.window.showInformationMessage('Vulnerability detection started...');
}

function checkForVulnerabilities(filePath) {
    // Placeholder function where you would integrate your vulnerability checking logic
    // e.g., run OWASP Dependency-Check on the file or perform custom analysis.
    vscode.window.showInformationMessage(`Checking ${filePath} for vulnerabilities...`);
}

function runDependencyCheck(entryPath, callback) {
    const outputDir = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'reports');
    const reportPath = path.join(outputDir, 'dependency-check-report.json');

    // Ensure the reports directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Construct the command with the path to the entry file or directory
    const command = `npx dependency-check ${entryPath} --format JSON --out ${reportPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Dependency-Check error: ${error.message}`);
            vscode.window.showErrorMessage(`Dependency-Check error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Dependency-Check stderr: ${stderr}`);
            vscode.window.showErrorMessage(`Dependency-Check stderr: ${stderr}`);
            return;
        }
        console.log(`Dependency-Check stdout: ${stdout}`);
        vscode.window.showInformationMessage('Dependency-Check completed successfully!');

        // Trigger the callback to load the report with the updated path
        callback(reportPath);
    });
}


function generateReportHtml(reportJson) {
    // Simple example of how to turn the JSON report into HTML
    let html = '<h2>Dependency-Check Report</h2><ul>';
    reportJson.dependencies.forEach(dep => {
        if (dep.vulnerabilities && dep.vulnerabilities.length > 0) {
            html += `<li><strong>${dep.fileName}</strong><ul>`;
            dep.vulnerabilities.forEach(vuln => {
                html += `<li>${vuln.name}: ${vuln.description}</li>`;
            });
            html += '</ul></li>';
        }
    });
    html += '</ul>';
    return html;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
