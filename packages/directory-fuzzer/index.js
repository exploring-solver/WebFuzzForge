const WebFuzzForgeCore = require('@webfuzzforge/core');

class DirectoryFuzzer {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
  }

  async fuzzDirectories(wordlist) {
    const results = [];
    for (const word of wordlist) {
      const response = await this.core.makeRequest(`/${word}`);
      if (response !== null) {
        results.push(`/${word}`);
      }
    }
    return results;
  }
}

module.exports = DirectoryFuzzer;