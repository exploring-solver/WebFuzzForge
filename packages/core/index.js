const axios = require('axios');

class WebFuzzForgeCore {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeRequest(path, method = 'GET', data = null) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${path}`,
        data
      });
      return response.data;
    } catch (error) {
      console.error(`Error making request: ${error.message}`);
      return null;
    }
  }
}

module.exports = WebFuzzForgeCore;