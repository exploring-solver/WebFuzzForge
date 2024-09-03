export const runFuzzer = async (fuzzerName, backendUrl, token, params) => {
    try {
      const response = await fetch(`${backendUrl}/${fuzzerName.replace(/([A-Z])/g, '-$1').toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error in ${fuzzerName}:`, error);
      return `Error: ${error.message}`;
    }
  };
  
  export const getFuzzerParams = (fuzzerName, baseUrl) => {
    switch (fuzzerName) {
      case 'directoryFuzzer':
        return { baseUrl, directories: ['admin', 'config', 'backup', 'test'] };
      case 'apiFuzzer':
        return { baseUrl, endpoints: ['/api/v1/users', '/api/v1/products'], methods: ['GET', 'POST', 'PUT', 'DELETE'] };
      case 'parameterFuzzer':
        return { baseUrl, endpoint: '/search', parameters: ['q', 'sort'], payloads: ["'", "\"", "<script>", "1=1"] };
      case 'subdomainDiscovery':
        return { baseUrl, subdomains: ['mail', 'www', 'blog', 'dev'] };
      case 'vhostDiscovery':
        return { baseUrl, vhosts: ['test.example.com', 'dev.example.com', 'staging.example.com'] };
      default:
        return { baseUrl };
    }
  };