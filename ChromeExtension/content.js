// Function to simulate XSS attack
// Function to simulate XSS attack
function simulateXSS() {
    // Approach 1: DOM-based XSS
    const payload = "JaVaScRiPt:alert('XSS Test')";
    const newLink = document.createElement('a');
    newLink.href = payload;
    newLink.textContent = 'Click me (DOM-based XSS Test)';
    document.body.appendChild(newLink);
  
    // Approach 2: HTML injection (without script tags)
    const unsafeDiv = document.createElement('div');
    unsafeDiv.innerHTML = '<img src=x onerror="alert(\'XSS via HTML injection\')">';
    document.body.appendChild(unsafeDiv);
  
    // Approach 3: Fill input fields with potentially dangerous values
    const inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      input.value = '"><img src=x onerror="alert(\'XSS in input\')">';
    }
  
    // Approach 4: Create a fake input field
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('type', 'text');
    fakeInput.setAttribute('value', '"><img src=x onerror="alert(\'XSS in fake input\')"');
    document.body.appendChild(fakeInput);
  
    console.log('XSS attack simulated. Check the page for potentially vulnerable elements.');
  }
  
  
  // Function to simulate Clickjacking
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
    alert('Clickjacking simulation: An invisible iframe has been added over the page.');
  }
  
  // Function to simulate CSRF
  function simulateCSRF() {
    const form = document.createElement('form');
    form.action = 'http://localhost:3000/api/sensitive-action';
    form.method = 'POST';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'action';
    input.value = 'delete_account';
    
    form.appendChild(input);
    document.body.appendChild(form);
    
    alert('CSRF simulation: A hidden form has been added to the page. In a real attack, this might be submitted automatically.');
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'simulateAttack') {
      switch (request.attackType) {
        case 'xss':
          simulateXSS();
          break;
        case 'clickjacking':
          simulateClickjacking();
          break;
        case 'csrf':
          simulateCSRF();
          break;
        default:
          console.error('Unknown attack type');
      }
    }
  });
  
  console.log('Local Development Security Tester content script loaded');