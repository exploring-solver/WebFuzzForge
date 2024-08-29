// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      // Check if the URL starts with localhost or 127.0.0.1
      if (tab.url.startsWith('http://localhost') || tab.url.startsWith('http://127.0.0.1')) {
        // Enable the extension icon
        chrome.action.setIcon({
          path: {
            "16": "images/icon16.png",
            "48": "images/icon48.png",
            "128": "images/icon128.png"
          },
          tabId: tabId
        });
      } else {
        // Disable the extension icon
        chrome.action.setIcon({
          path: {
            "16": "images/icon16_disabled.png",
            "48": "images/icon48_disabled.png",
            "128": "images/icon128_disabled.png"
          },
          tabId: tabId
        });
      }
    }
  });
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'simulateAttack') {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            files: ['content-script.js']
          }, () => {
            chrome.tabs.sendMessage(activeTab.id, {action: 'simulateAttack', attackType: request.attackType});
          });
        }
      });
    }
  });