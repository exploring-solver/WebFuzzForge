// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'simulateAttack') {
      simulateAttack(request.attackType);
    }
  });
  
  function simulateAttack(attackType) {
    switch (attackType) {
      case 'xss':
        simulateXSS();
        break;
      case 'clickjacking':
        simulateClickjacking();
        break;
      case 'csrf':
        simulateCSRF();
        break;
      case 'dom-xss':
        simulateDOMXSS();
        break;
      case 'idor':
        simulateIDOR();
        break;
      case 'open-redirect':
        simulateOpenRedirect();
        break;
      case 'local-storage':
        simulateLocalStorageManipulation();
        break;
      case 'dom-size':
        simulateExcessiveDOMSize();
        break;
    }
  }
  
  function simulateXSS() {
    const xssPayload = '"><img src=x onerror="alert(\'XSS vulnerability detected!\')">';
    const inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      input.value = xssPayload;
    }
    console.log('XSS attack simulated. Check input fields for the injected payload.');
  }
  
  function simulateClickjacking() {
    const iframe = document.createElement('iframe');
    iframe.src = window.location.href;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.opacity = '0.5';
    iframe.style.zIndex = '1000';
    document.body.appendChild(iframe);
    console.log('Clickjacking attack simulated. Check if the page is overlaid with a semi-transparent iframe.');
  }
  
  function simulateCSRF() {
    const csrfForm = document.createElement('form');
    csrfForm.action = window.location.href + '/api/sensitive-action';
    csrfForm.method = 'POST';
    csrfForm.innerHTML = '<input type="hidden" name="action" value="delete_account">';
    document.body.appendChild(csrfForm);
    console.log('CSRF attack simulated. A hidden form has been added to the page.');
  }
  
  function simulateDOMXSS() {
    const url = new URL(window.location.href);
    const vulnerableParam = url.searchParams.get('user_input') || 'Default';
    const div = document.createElement('div');
    div.innerHTML = `Welcome, ${vulnerableParam}!`;
    document.body.appendChild(div);
    console.log('DOM-based XSS simulated. Check the page for potentially unescaped user input.');
  }
  
  function simulateIDOR() {
    const userIds = [1, 2, 3, 4, 5];
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const link = document.createElement('a');
    link.href = `/user/profile?id=${randomUserId}`;
    link.textContent = `View User Profile (ID: ${randomUserId})`;
    document.body.appendChild(link);
    console.log('IDOR vulnerability simulated. Check for exposed user IDs in URLs.');
  }
  
  function simulateOpenRedirect() {
    const redirectUrl = 'https://example.com';
    const link = document.createElement('a');
    link.href = `/redirect?url=${encodeURIComponent(redirectUrl)}`;
    link.textContent = 'Click here to redirect';
    document.body.appendChild(link);
    console.log('Open Redirect vulnerability simulated. Check for unvalidated redirect URLs.');
  }
  
  function simulateLocalStorageManipulation() {
    localStorage.setItem('user_token', 'fake_sensitive_token_123');
    localStorage.setItem('user_email', 'user@example.com');
    console.log('Local Storage manipulation simulated. Check browser storage for exposed sensitive data.');
  }
  
  function simulateExcessiveDOMSize() {
    const largeDiv = document.createElement('div');
    for (let i = 0; i < 10000; i++) {
      const span = document.createElement('span');
      span.textContent = 'This is a lot of text. ';
      largeDiv.appendChild(span);
    }
    document.body.appendChild(largeDiv);
    console.log('Excessive DOM size simulated. Check page performance and memory usage.');
  }