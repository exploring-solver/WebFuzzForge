const WebFuzzForgeCore = require('@webfuzzforge/core');

class ParameterFuzzer {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
  }

  async fuzzParameters(endpoint, params, payloads) {
    const results = [];
    for (const param of params) {
      for (const payload of payloads) {
        const response = await this.core.makeRequest(`${endpoint}?${param}=${payload}`);
        if (response !== null) {
          results.push({ param, payload });
        }
      }
    }
    return results;
  }
}

module.exports = ParameterFuzzer;