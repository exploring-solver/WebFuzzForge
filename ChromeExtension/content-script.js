// // Function to get browser information
// function getBrowserInfo() {
//   return {
//     userAgent: navigator.userAgent,
//     platform: navigator.platform,
//     language: navigator.language,
//     url: window.location.href,
//     date: new Date().toLocaleString()
//   };
// }

// // Initialize the report object
// let report = {
//   browserInfo: getBrowserInfo(),
//   attacks: []
// };

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'simulateAllAttacks') {
//     simulateAllAttacks(() => {
//       downloadReport();
//     });
//   } else if (request.action === 'simulateAttack') {
//     simulateAttack(request.attackType);
//   }
// });

// function simulateAllAttacks(callback) {
//   const attackTypes = ['xss', 'dom-xss', 'clickjacking', 'csrf', 'idor', 'open-redirect', 'local-storage', 'dom-size'];
//   let currentAttackIndex = 0;

//   function nextAttack() {
//     if (currentAttackIndex < attackTypes.length) {
//       simulateAttack(attackTypes[currentAttackIndex], () => {
//         currentAttackIndex++;
//         nextAttack();
//       });
//     } else {
//       callback();
//     }
//   }

//   nextAttack();
// }

// function simulateAttack(attackType, callback) {
//   switch (attackType) {
//     case 'xss':
//       simulateXSS();
//       break;
//     case 'clickjacking':
//       simulateClickjacking();
//       break;
//     case 'csrf':
//       simulateCSRF();
//       break;
//     case 'dom-xss':
//       simulateDOMXSS();
//       break;
//     case 'idor':
//       simulateIDOR();
//       break;
//     case 'open-redirect':
//       simulateOpenRedirect();
//       break;
//     case 'local-storage':
//       simulateLocalStorageManipulation();
//       break;
//     case 'dom-size':
//       simulateExcessiveDOMSize();
//       break;
//   }
//   if (callback) callback();
// }

// // Simulate attacks and add more detailed information to the report
// function simulateXSS() {
//   const xssPayload = '"><img src=x onerror="alert(\'XSS vulnerability detected!\')">';
//   const inputs = document.getElementsByTagName('input');
//   let inputData = [];
//   for (let input of inputs) {
//     inputData.push({ name: input.name, value: input.value });
//     input.value = xssPayload;
//   }
//   report.attacks.push({ type: 'XSS', inputData, result: 'XSS payload injected into inputs' });
// }

// function simulateClickjacking() {
//   const iframe = document.createElement('iframe');
//   iframe.src = window.location.href;
//   iframe.style.position = 'absolute';
//   iframe.style.top = '0';
//   iframe.style.left = '0';
//   iframe.style.width = '100%';
//   iframe.style.height = '100%';
//   iframe.style.opacity = '0.5';
//   iframe.style.zIndex = '1000';
//   document.body.appendChild(iframe);

//   const isProtected = document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null;
//   report.attacks.push({ type: 'Clickjacking', result: isProtected ? 'Site protected by CSP/X-Frame-Options' : 'Iframe added successfully' });
// }

// function simulateCSRF() {
//   const csrfForm = document.createElement('form');
//   csrfForm.action = window.location.href + '/api/sensitive-action';
//   csrfForm.method = 'POST';
//   csrfForm.innerHTML = '<input type="hidden" name="action" value="delete_account">';
//   document.body.appendChild(csrfForm);

//   report.attacks.push({ type: 'CSRF', formAction: csrfForm.action, result: 'Hidden form added to page for CSRF simulation' });
// }

// function simulateDOMXSS() {
//   const url = new URL(window.location.href);
//   const vulnerableParam = url.searchParams.get('user_input') || 'Default';
//   const div = document.createElement('div');
//   div.innerHTML = `Welcome, ${vulnerableParam}!`;
//   document.body.appendChild(div);

//   const vulnerable = vulnerableParam.includes('<') || vulnerableParam.includes('>') || vulnerableParam.includes('script');
//   report.attacks.push({ type: 'DOM-XSS', vulnerableParam, result: vulnerable ? 'Potential DOM XSS found' : 'No vulnerability detected' });
// }

// function simulateIDOR() {
//   const userIds = [1, 2, 3, 4, 5];
//   const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
//   const link = document.createElement('a');
//   link.href = `/user/profile?id=${randomUserId}`;
//   link.textContent = `View User Profile (ID: ${randomUserId})`;
//   document.body.appendChild(link);

//   report.attacks.push({ type: 'IDOR', exposedUserId: randomUserId, result: `Exposed user ID: ${randomUserId}` });
// }

// function simulateOpenRedirect() {
//   const redirectUrl = 'https://example.com';
//   const link = document.createElement('a');
//   link.href = `/redirect?url=${encodeURIComponent(redirectUrl)}`;
//   link.textContent = 'Click here to redirect';
//   document.body.appendChild(link);

//   report.attacks.push({ type: 'Open Redirect', redirectUrl, result: 'Unvalidated redirect added' });
// }

// function simulateLocalStorageManipulation() {
//   localStorage.setItem('user_token', 'fake_sensitive_token_123');
//   localStorage.setItem('user_email', 'user@example.com');

//   report.attacks.push({ type: 'Local Storage Manipulation', items: ['user_token', 'user_email'], result: 'Sensitive data added to local storage' });
// }

// function simulateExcessiveDOMSize() {
//   const largeDiv = document.createElement('div');
//   for (let i = 0; i < 10000; i++) {
//     const span = document.createElement('span');
//     span.textContent = 'This is a lot of text. ';
//     largeDiv.appendChild(span);
//   }
//   document.body.appendChild(largeDiv);

//   report.attacks.push({ type: 'Excessive DOM Size', elementsAdded: 10000, result: 'Large DOM size simulated, check performance' });
// }

// // Download report as JSON
// function downloadReport() {
//   const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = 'attack_report.json';
//   link.click();
// }
// Function to get browser information
function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    url: window.location.href,
    date: new Date().toLocaleString()
  };
}

// Initialize the report object
let report = {
  browserInfo: getBrowserInfo(),
  attacks: []
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'simulateAllAttacks') {
    simulateAllAttacks(() => {
      downloadReport();
    });
  } else if (request.action === 'simulateAttack') {
    simulateAttack(request.attackType);
  }
});

function simulateAllAttacks(callback) {
  const attackTypes = ['xss', 'dom-xss', 'clickjacking', 'csrf', 'idor', 'open-redirect', 'local-storage', 'dom-size'];
  let currentAttackIndex = 0;

  function nextAttack() {
    if (currentAttackIndex < attackTypes.length) {
      simulateAttack(attackTypes[currentAttackIndex], (error) => {
        if (error) {
          report.attacks.push({
            type: attackTypes[currentAttackIndex],
            result: `Error: ${error}`
          });
        }
        currentAttackIndex++;
        nextAttack();
      });
    } else {
      callback();
    }
  }

  nextAttack();
}

function simulateAttack(attackType, callback) {
  try {
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
      default:
        throw new Error(`Unknown attack type: ${attackType}`);
    }
    if (callback) callback();
  } catch (error) {
    if (callback) callback(error.message);
  }
}

// Simulate attacks and add more detailed information to the report
function simulateXSS() {
  try {
    const xssPayload = '"><img src=x onerror="alert(\'XSS vulnerability detected!\')">';
    const inputs = document.getElementsByTagName('input');
    let inputData = [];
    for (let input of inputs) {
      inputData.push({ name: input.name, value: input.value });
      input.value = xssPayload;
    }
    report.attacks.push({ type: 'XSS', inputData, result: 'XSS payload injected into inputs' });
  } catch (error) {
    report.attacks.push({ type: 'XSS', result: `Error: ${error.message}` });
  }
}

function simulateClickjacking() {
  try {
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

    const isProtected = document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null;
    report.attacks.push({ type: 'Clickjacking', result: isProtected ? 'Site protected by CSP/X-Frame-Options' : 'Iframe added successfully' });
  } catch (error) {
    report.attacks.push({ type: 'Clickjacking', result: `Error: ${error.message}` });
  }
}

function simulateCSRF() {
  try {
    const csrfForm = document.createElement('form');
    csrfForm.action = window.location.href + '/api/sensitive-action';
    csrfForm.method = 'POST';
    csrfForm.innerHTML = '<input type="hidden" name="action" value="delete_account">';
    document.body.appendChild(csrfForm);

    report.attacks.push({ type: 'CSRF', formAction: csrfForm.action, result: 'Hidden form added to page for CSRF simulation' });
  } catch (error) {
    report.attacks.push({ type: 'CSRF', result: `Error: ${error.message}` });
  }
}

function simulateDOMXSS() {
  try {
    const url = new URL(window.location.href);
    const vulnerableParam = url.searchParams.get('user_input') || 'Default';
    const div = document.createElement('div');
    div.innerHTML = `Welcome, ${vulnerableParam}!`;
    document.body.appendChild(div);

    const vulnerable = vulnerableParam.includes('<') || vulnerableParam.includes('>') || vulnerableParam.includes('script');
    report.attacks.push({ type: 'DOM-XSS', vulnerableParam, result: vulnerable ? 'Potential DOM XSS found' : 'No vulnerability detected' });
  } catch (error) {
    report.attacks.push({ type: 'DOM-XSS', result: `Error: ${error.message}` });
  }
}

function simulateIDOR() {
  try {
    const userIds = [1, 2, 3, 4, 5];
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const link = document.createElement('a');
    link.href = `/user/profile?id=${randomUserId}`;
    link.textContent = `View User Profile (ID: ${randomUserId})`;
    document.body.appendChild(link);

    report.attacks.push({ type: 'IDOR', exposedUserId: randomUserId, result: `Exposed user ID: ${randomUserId}` });
  } catch (error) {
    report.attacks.push({ type: 'IDOR', result: `Error: ${error.message}` });
  }
}

function simulateOpenRedirect() {
  try {
    const redirectUrl = 'https://example.com';
    const link = document.createElement('a');
    link.href = `/redirect?url=${encodeURIComponent(redirectUrl)}`;
    link.textContent = 'Click here to redirect';
    document.body.appendChild(link);

    report.attacks.push({ type: 'Open Redirect', redirectUrl, result: 'Unvalidated redirect added' });
  } catch (error) {
    report.attacks.push({ type: 'Open Redirect', result: `Error: ${error.message}` });
  }
}

function simulateLocalStorageManipulation() {
  try {
    localStorage.setItem('user_token', 'fake_sensitive_token_123');
    localStorage.setItem('user_email', 'user@example.com');

    report.attacks.push({ type: 'Local Storage Manipulation', items: ['user_token', 'user_email'], result: 'Sensitive data added to local storage' });
  } catch (error) {
    report.attacks.push({ type: 'Local Storage Manipulation', result: `Error: ${error.message}` });
  }
}

function simulateExcessiveDOMSize() {
  try {
    const largeDiv = document.createElement('div');
    for (let i = 0; i < 10000; i++) {
      const span = document.createElement('span');
      span.textContent = 'This is a lot of text. ';
      largeDiv.appendChild(span);
    }
    document.body.appendChild(largeDiv);

    report.attacks.push({ type: 'Excessive DOM Size', elementsAdded: 10000, result: 'Large DOM size simulated, check performance' });
  } catch (error) {
    report.attacks.push({ type: 'Excessive DOM Size', result: `Error: ${error.message}` });
  }
}

// Download report as JSON
function downloadReport() {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'attack_report.json';
  link.click();
}
