const WebFuzzForgeCore = require('@webfuzzforge/core');

class VHostDiscovery {
  constructor(baseUrl) {
    this.core = new WebFuzzForgeCore(baseUrl);
  }

  async discoverVHosts(hostlist) {
    const results = [];
    for (const host of hostlist) {
      const response = await this.core.makeRequest('/', 'GET', null, { 
        headers: { 'Host': host }
      });
      if (response !== null) {
        results.push(host);
      }
    }
    return results;
  }
}

module.exports = VHostDiscovery;