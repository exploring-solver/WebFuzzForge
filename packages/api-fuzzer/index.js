const WebFuzzForgeCore = require('@webfuzzforge/core');

class APIFuzzer {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
  }

  async fuzzAPIEndpoints(endpoints, methods) {
    const results = [];
    for (const endpoint of endpoints) {
      for (const method of methods) {
        const response = await this.core.makeRequest(endpoint, method);
        if (response !== null) {
          results.push({ endpoint, method });
        }
      }
    }
    return results;
  }
}

module.exports = APIFuzzer;