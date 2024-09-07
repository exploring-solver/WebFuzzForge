# WebFuzzForge : a web application fuzzer

## Full Working Text Editor + IDE
1. **Use Yarn**
   - yarn tauri build 
   - yarn tauri dev
2. **Prerequisites**
   - rust
   - visual studio build tools
   - tauri

## Chrome Extension: Local Web App Security Tester (8 kinds of client side attacks simulation- all working for now)
1. **Cross-Site Scripting (XSS) Simulation**
   - Injects potentially malicious payloads into input fields
   - Demonstrates how unsanitized user input could lead to XSS vulnerabilities
2. **DOM-based XSS Simulation**
   - Shows how user input from URL parameters could be unsafely inserted into the DOM
   - Helps identify areas where proper input sanitization is needed
3. **Clickjacking Simulation**
   - Overlays a semi-transparent iframe on the current page
   - Illustrates how malicious sites could potentially trick users into unintended actions
4. **Cross-Site Request Forgery (CSRF) Simulation**
   - Adds a hidden form to the page
   - Demonstrates how malicious sites could potentially trigger unwanted actions on your site
5. **Insecure Direct Object References (IDOR) Simulation**
   - Creates links with potentially sensitive user IDs
   - Shows how improper access controls could lead to unauthorized data access
6. **Open Redirect Simulation**
   - Generates links with redirect parameters
   - Highlights the dangers of unvalidated redirects
7. **Local Storage Manipulation**
   - Inserts potentially sensitive data into local storage
   - Demonstrates the risks of storing sensitive information client-side
8. **Excessive DOM Size Simulation**
   - Creates a very large DOM structure
   - Illustrates potential performance issues due to DOM bloat

## VS Code Extension: Workspace Security Monitor
1. **Real-time Monitoring**
   - Uses the chokidar package to watch for file changes in your workspace
2. **Vulnerability Detection**
   - Uses npm dependency-check (but not currently working)

## Web and Server Monitoring Dashboard and Testing Tool

1. **Parameter Fuzzer**
   - Automatically tests various input parameters to uncover potential vulnerabilities
   - NPM package: 'fuzzball' for fuzzy string matching and parameter fuzzing

2. **Directory Fuzzer**
   - Scans web directories to discover hidden or sensitive files/folders
   - NPM package: 'dirbuster' for directory and file brute-forcing

3. **Subdomain Discovery**
   - Enumerates subdomains of a given domain to map the attack surface
   - NPM package: 'subfinder' for passive subdomain enumeration

4. **Virtual Host (vhost) Discovery**
   - Identifies virtual hosts on a web server to uncover potentially hidden services
   - NPM package: 'virtual-host-discovery' for discovering virtual hosts

These tools help developers identify security vulnerabilities and misconfigurations in their web applications and servers. The mentioned NPM packages can be integrated into projects for automated fuzzing and testing, enhancing the overall security posture of the application.

# Made by team Ramanujan for SIH Internal round 2024
