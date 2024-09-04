// const { dialog, fs, shell, invoke } = window.__TAURI__;


// let editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
//   lineNumbers: true,
//   mode: 'javascript',
//   theme: 'dracula',
//   matchBrackets: true,
//   extraKeys: {
//     "Ctrl-S": () => saveCurrentFile(),
//     "Cmd-S": () => saveCurrentFile(),
//     "Ctrl-F": "findPersistent",
//     "Ctrl-Enter": () => editor.setOption("fullScreen", !editor.getOption("fullScreen")),
//   },
//   foldGutter: true,
//   gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
//   styleActiveLine: true,
//   matchTags: { bothTags: true },
//   autoCloseBrackets: true,
//   autoCloseTags: true,
// });

// let currentFilePath = '';
// let terminal;

// document.addEventListener('DOMContentLoaded', () => {
//   terminal = new Terminal();
//   terminal.open(document.getElementById('terminal'));
// });

// document.getElementById('open-folder').addEventListener('click', async () => {
//   const selected = await dialog.open({ directory: true });
//   if (selected) {
//     loadWorkspace(selected);
//   }
// });

// document.getElementById('save-file').addEventListener('click', () => {
//   saveCurrentFile();
// });

// document.getElementById('run-code').addEventListener('click', () => {
//   runCode();
// });

// async function loadWorkspace(folderPath) {
//   const files = await fs.readDir(folderPath, { recursive: true });
//   displayFileTree(files);
// }

// function displayFileTree(files, parentElement = document.getElementById('file-tree')) {
//   parentElement.innerHTML = ''; // Clear existing content
//   files.forEach(file => {
//     const fileElement = document.createElement('div');
//     fileElement.textContent = file.name;
//     fileElement.className = file.children ? 'folder collapsed' : 'file';
    
//     if (file.children) {
//       fileElement.addEventListener('click', function () {
//         this.classList.toggle('expanded');
//         this.classList.toggle('collapsed');
//         this.nextElementSibling.classList.toggle('active');
//       });

//       const nestedContainer = document.createElement('div');
//       nestedContainer.className = 'nested';
//       displayFileTree(file.children, nestedContainer);
//       parentElement.appendChild(fileElement);
//       parentElement.appendChild(nestedContainer);
//     } else {
//       fileElement.addEventListener('click', () => {
//         openFile(file.path);
//       });
//       parentElement.appendChild(fileElement);
//     }
//   });
// }

// async function openFile(filePath) {
//   const content = await fs.readTextFile(filePath);
//   editor.setValue(content);
//   currentFilePath = filePath;
//   document.getElementById('current-file').textContent = filePath;
// }

// async function saveCurrentFile() {
//   if (currentFilePath) {
//     const content = editor.getValue();
//     await fs.writeTextFile(currentFilePath, content);
//     terminal.writeln('File saved successfully!');
//   } else {
//     terminal.writeln('No file is currently open.');
//   }
// }

// // async function runCode() {
// //   if (currentFilePath) {
// //     const content = editor.getValue();
// //     try {
// //       const command = getCommandForFile(currentFilePath);
// //       if (command) {
// //         terminal.clear();
// //         terminal.writeln(`Running: ${command} ${currentFilePath}`);
// //         const output = await shell.Command.sidecar('run-code', [command, currentFilePath]).execute();
// //         terminal.writeln(output.stdout);
// //         if (output.stderr) {
// //           terminal.writeln('Error:');
// //           terminal.writeln(output.stderr);
// //         }
// //       } else {
// //         terminal.writeln('Unsupported file type for execution.');
// //       }
// //     } catch (error) {
// //       terminal.writeln('Error executing code:');
// //       terminal.writeln(error.toString());
// //     }
// //   } else {
// //     terminal.writeln('No file is currently open.');
// //   }
// // }

// // function getCommandForFile(filePath) {
// //   const extension = filePath.split('.').pop().toLowerCase();
// //   switch (extension) {
// //     case 'js':
// //       return 'node';
// //     case 'py':
// //       return 'python';
// //     case 'rb':
// //       return 'ruby';
// //     // Add more file types and their corresponding execution commands as needed
// //     default:
// //       return null;
// //   }
// // }



// // ... (keep existing code)

// // let terminal;

// document.addEventListener('DOMContentLoaded', () => {
//   terminal = new Terminal();
//   terminal.open(document.getElementById('terminal'));
  
//   // Set up terminal input handling
//   let currentLine = '';
//   terminal.onKey(({ key, domEvent }) => {
//     const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

//     if (domEvent.keyCode === 13) { // Enter key
//       terminal.write('\r\n');
//       executeCommand(currentLine);
//       currentLine = '';
//     } else if (domEvent.keyCode === 8) { // Backspace
//       if (currentLine.length > 0) {
//         currentLine = currentLine.slice(0, -1);
//         terminal.write('\b \b');
//       }
//     } else if (printable) {
//       currentLine += key;
//       terminal.write(key);
//     }
//   });
// });

// // ... (keep existing code)

// async function executeCommand(command) {
//   try {
//     const output = await invoke('execute_command', { command });
//     terminal.writeln(output);
//   } catch (error) {
//     terminal.writeln('Error executing command:');
//     terminal.writeln(error.toString());
//   }
// }

// // Modify the runCode function to use the terminal
// async function runCode() {
//   if (currentFilePath) {
//     const content = editor.getValue();
//     try {
//       const command = getCommandForFile(currentFilePath);
//       if (command) {
//         terminal.clear();
//         terminal.writeln(`Running: ${command} ${currentFilePath}`);
//         const output = await invoke('execute_command', { command: `${command} ${currentFilePath}` });
//         terminal.writeln(output);
//       } else {
//         terminal.writeln('Unsupported file type for execution.');
//       }
//     } catch (error) {
//       terminal.writeln('Error executing code:');
//       terminal.writeln(error.toString());
//     }
//   } else {
//     terminal.writeln('No file is currently open.');
//   }
// }

// // ... (keep the rest of the existing code)
const { dialog, fs, invoke } = window.__TAURI__;

let editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'dracula',
  matchBrackets: true,
  extraKeys: {
    "Ctrl-S": () => saveCurrentFile(),
    "Cmd-S": () => saveCurrentFile(),
    "Ctrl-F": "findPersistent",
    "Ctrl-Enter": () => editor.setOption("fullScreen", !editor.getOption("fullScreen")),
  },
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  styleActiveLine: true,
  matchTags: { bothTags: true },
  autoCloseBrackets: true,
  autoCloseTags: true,
});

let currentFilePath = '';
let currentDirectoryPath = '';
let terminal;

// document.addEventListener('DOMContentLoaded', () => {
//   terminal = new Terminal();
//   terminal.open(document.getElementById('terminal'));
  
//   // Set up terminal input handling
//   let currentLine = '';
//   terminal.onKey(({ key, domEvent }) => {
//     const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

//     if (domEvent.keyCode === 13) { // Enter key
//       terminal.write('\r\n');
//       executeCommand(currentLine);
//       currentLine = '';
//     } else if (domEvent.keyCode === 8) { // Backspace
//       if (currentLine.length > 0) {
//         currentLine = currentLine.slice(0, -1);
//         terminal.write('\b \b');
//       }
//     } else if (printable) {
//       currentLine += key;
//       terminal.write(key);
//     }
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  terminal = new Terminal();
  terminal.open(document.getElementById('terminal'));

  const directoryFuzzerButton = document.getElementById('directory-fuzzer');
  const fuzzerContainer = document.getElementById('fuzzer-container');

  directoryFuzzerButton.addEventListener('click', () => {
    fuzzerContainer.style.display = fuzzerContainer.style.display === 'flex' ? 'none' : 'flex';
  });

  // Set up terminal input handling
  let currentLine = '';
  terminal.onKey(({ key, domEvent }) => {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

    if (domEvent.keyCode === 13) { // Enter key
      terminal.write('\r\n');
      executeCommand(currentLine);
      currentLine = '';
    } else if (domEvent.keyCode === 8) { // Backspace
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        terminal.write('\b \b');
      }
    } else if (printable) {
      currentLine += key;
      terminal.write(key);
    }
  });


  const apiFuzzerButton = document.getElementById('api-fuzzer');
  const apiFuzzerContainer = document.getElementById('api-fuzzer-container');

  apiFuzzerButton.addEventListener('click', () => {
    apiFuzzerContainer.style.display = apiFuzzerContainer.style.display === 'flex' ? 'none' : 'flex';
  });

  document.getElementById('run-api-fuzzer').addEventListener('click', async () => {
    const endpointsInput = document.getElementById('endpoints').value;
    const methodsInput = document.getElementById('methods').value;
    const endpoints = endpointsInput.split(/\s+/);
    const methods = methodsInput.split(/,/);

    const results = await fuzzAPIEndpoints(endpoints, methods);
    terminal.writeln('API Fuzzing completed. Results:');
    results.forEach(result => {
      terminal.writeln(`Endpoint: ${result.endpoint}, Method: ${result.method}, Status: ${result.status}`);
    });
  });
});

async function fuzzDirectories(basePath, wordlist) {
  const results = [];

  const files = await fs.readDir(basePath, { recursive: true });

  files.forEach(file => {
    if (file.children) {
      wordlist.forEach(word => {
        if (file.name.includes(word)) {
          results.push(file.path);
        }
      });
    }
  });
  

  return results;
}

async function fuzzAPIEndpoints(endpoints, methods) {
  const results = [];
  for (const endpoint of endpoints) {
    for (const method of methods) {
      try {
        const response = await fetch(endpoint, { method });
        if (response.ok) {
          results.push({ endpoint, method, status: response.status });
        }
      } catch (error) {
        console.error(`Error fetching ${method} ${endpoint}:`, error);
      }
    }
  }
  console.log(results);
  console.log(endpoints);
  console.log(methods);
  return results;
}


// Function to run the directory fuzzer
document.getElementById('run-fuzzer').addEventListener('click', async () => {
  const wordlistInput = document.getElementById('wordlist').value;
  const wordlist = wordlistInput.split(/[\s,]+/); // Split by spaces, commas, or new lines
  
  const results = await fuzzDirectories(currentDirectoryPath, wordlist);
  terminal.writeln('Fuzzing completed. Directories found:');
  results.forEach(result => terminal.writeln(result));
});


document.getElementById('clear-terminal').addEventListener('click', function() {
  terminal.clear();
});


document.getElementById('open-folder').addEventListener('click', async () => {
  const selected = await dialog.open({ directory: true });
  currentDirectoryPath = selected;
  if (selected) {
    loadWorkspace(selected);
  }
});

document.getElementById('save-file').addEventListener('click', () => {
  saveCurrentFile();
});

document.getElementById('run-code').addEventListener('click', () => {
  runCode();
});

async function loadWorkspace(folderPath) {
  const files = await fs.readDir(folderPath, { recursive: true });
  displayFileTree(files);
}

function displayFileTree(files, parentElement = document.getElementById('file-tree')) {
  parentElement.innerHTML = ''; // Clear existing content
  files.forEach(file => {
    const fileElement = document.createElement('div');
    fileElement.textContent = file.name;
    fileElement.className = file.children ? 'folder collapsed' : 'file';
    
    if (file.children) {
      fileElement.addEventListener('click', function () {
        this.classList.toggle('expanded');
        this.classList.toggle('collapsed');
        this.nextElementSibling.classList.toggle('active');
      });

      const nestedContainer = document.createElement('div');
      nestedContainer.className = 'nested';
      displayFileTree(file.children, nestedContainer);
      parentElement.appendChild(fileElement);
      parentElement.appendChild(nestedContainer);
    } else {
      fileElement.addEventListener('click', () => {
        openFile(file.path);
      });
      parentElement.appendChild(fileElement);
    }
  });
}

async function openFile(filePath) {
  const content = await fs.readTextFile(filePath);
  editor.setValue(content);
  currentFilePath = filePath;
  document.getElementById('current-file').textContent = filePath;
}

async function saveCurrentFile() {
  if (currentFilePath) {
    const content = editor.getValue();
    await fs.writeTextFile(currentFilePath, content);
    terminal.writeln('File saved successfully!');
  } else {
    terminal.writeln('No file is currently open.');
  }
}

async function executeCommand(command) {
  try {
    const output = await invoke('execute_command', { command });
    terminal.writeln(output);
  } catch (error) {
    terminal.writeln('Error executing command:');
    terminal.writeln(error.toString());
  }
}

async function runCode() {
  if (currentFilePath) {
    try {
      const command = getCommandForFile(currentFilePath);
      if (command) {
        terminal.clear();
        terminal.writeln(`Running: ${command} ${currentFilePath}`);
        const output = await invoke('execute_command', { 
          command: command,
          filePath: currentFilePath
        });
        terminal.writeln(output);
      } else {
        terminal.writeln('Unsupported file type for execution.');
      }
    } catch (error) {
      terminal.writeln('Error executing code:');
      terminal.writeln(error.toString());
    }
  } else {
    terminal.writeln('No file is currently open.');
  }
}

function getCommandForFile(filePath) {
  const extension = filePath.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
      return 'node';
    case 'py':
      return 'python';
    case 'rb':
      return 'ruby';
    // Add more file types and their corresponding execution commands as needed
    default:
      return null;
  }
}

function closeFuzzer(containerId) {
  document.getElementById(containerId).style.display = 'none';
}

document.getElementById("toggle-sidebar").addEventListener("click", function() {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("closed")) {
    sidebar.classList.remove("closed");
  } else {
    sidebar.classList.add("closed");
  }
});