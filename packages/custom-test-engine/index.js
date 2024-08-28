const WebFuzzForgeCore = require('@webfuzzforge/core');

class CustomTestEngine {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
  }

  async runCustomTest(testConfig) {
    const { endpoint, method, headers, body } = testConfig;
    const response = await this.core.makeRequest(endpoint, method, body, headers);
    return {
      passed: response !== null,
      response
    };
  }
}

module.exports = CustomTestEngine;