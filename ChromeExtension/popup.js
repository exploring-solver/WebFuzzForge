document.addEventListener('DOMContentLoaded', function() {
    // const buttons = ['xss', 'clickjacking', 'csrf'];
    const buttons = ['xss', 'dom-xss', 'clickjacking', 'csrf', 'idor', 'open-redirect', 'local-storage', 'dom-size'];
    
    buttons.forEach(attackType => {
      document.getElementById(attackType).addEventListener('click', function() {
        chrome.runtime.sendMessage({action: 'simulateAttack', attackType: attackType});
      });
    });
  });