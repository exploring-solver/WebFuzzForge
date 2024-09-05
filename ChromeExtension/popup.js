document.addEventListener('DOMContentLoaded', function() {
  const buttons = ['xss', 'dom-xss', 'clickjacking', 'csrf', 'idor', 'open-redirect', 'local-storage', 'dom-size'];

  // Add event listeners for individual attack simulation buttons
  buttons.forEach(attackType => {
    document.getElementById(attackType).addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'simulateAttack', attackType: attackType });
    });
  });

  // Add event listener for the "Simulate All Attacks" button
  document.getElementById('all-attacks').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'simulateAllAttacks' });
  });

  // Request reports and display them
  chrome.runtime.sendMessage({ action: 'getReports' }, function(response) {
    const reports = response.reports;
    const reportDiv = document.createElement('div');
    
    for (let [attackType, report] of Object.entries(reports)) {
      const reportSection = document.createElement('div');
      reportSection.innerHTML = `<h3>${attackType.toUpperCase()}</h3><pre>${JSON.stringify(report, null, 2)}</pre>`;
      reportDiv.appendChild(reportSection);
    }

    document.body.appendChild(reportDiv);
  });
});
