const vscode = require('vscode');

function activate(context) {
  const provider = new WebFuzzForgeSidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WebFuzzForgeSidebarProvider.viewType, provider)
  );
}

class WebFuzzForgeSidebarProvider {
  static viewType = 'webfuzzforge-sidebar';

  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  _getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
    const stylesUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'styles.css'));

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesUri}" rel="stylesheet">
        <title>WebFuzzForge</title>
    </head>
    <body>
        <div id="app">
            <h1>WebFuzzForge</h1>
            <div class="input-group">
                <label for="baseUrl">Base URL:</label>
                <input type="text" id="baseUrl" placeholder="Enter base URL">
            </div>
            <div class="tab-group">
                <button class="tab active">Directory Fuzzer</button>
                <button class="tab">API Fuzzer</button>
                <button class="tab">Parameter Fuzzer</button>
                <button class="tab">Subdomain Discovery</button>
                <button class="tab">VHost Discovery</button>
            </div>
            <div class="input-group">
                <label for="directories">Directories to Fuzz:</label>
                <input type="text" id="directories" placeholder="Enter directories">
                <button class="add-btn">Add</button>
            </div>
            <button class="run-btn">Run Directory Fuzzer</button>
            <div id="results">
                <!-- Results will be displayed here -->
            </div>
        </div>
        <script src="${scriptUri}"></script>
    </body>
    </html>`;
  }
}

module.exports = {
  activate
};

// Styles (media/styles.css)
body {
    font-family: Arial, sans-serif;
    padding: 10px;
}

.input-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 5px;
}

.tab-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.tab {
    background-color: var(--vscode-button-secondaryBackground);
    color: var(--vscode-button-secondaryForeground);
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
}

.tab.active {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
}

.add-btn, .run-btn {
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 5px;
}

.run-btn {
    display: block;
    width: 100%;
    margin-top: 10px;
}

#results {
    margin-top: 20px;
    border-top: 1px solid var(--vscode-panel-border);
    padding-top: 10px;
}

// Client-side JavaScript (media/main.js)
(function() {
    const vscode = acquireVsCodeApi();

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    document.querySelector('.run-btn').addEventListener('click', () => {
        const results = document.getElementById('results');
        results.innerHTML = '<p>Running... (This is a UI demo, no actual functionality is implemented)</p>';
    });

    document.querySelector('.add-btn').addEventListener('click', () => {
        const input = document.getElementById('directories');
        const newInput = input.cloneNode();
        newInput.value = '';
        input.parentNode.insertBefore(newInput, input.nextSibling);
    });
})();

// SVG Icon (media/icon.svg)
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
</svg>