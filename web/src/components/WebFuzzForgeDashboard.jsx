import React, { useState } from 'react';

const WebFuzzForgeDashboard = () => {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('directoryFuzzer');

  // New state for user inputs
  const [directories, setDirectories] = useState(['admin', 'config', 'backup', 'test']);
  const [apiEndpoints, setApiEndpoints] = useState(['/api/v1/users', '/api/v1/products']);
  const [apiMethods, setApiMethods] = useState(['GET', 'POST', 'PUT', 'DELETE']);
  const [paramEndpoint, setParamEndpoint] = useState('/search');
  const [parameters, setParameters] = useState(['q', 'sort']);
  const [payloads, setPayloads] = useState(["'", "\"", "<script>", "1=1"]);
  const [subdomains, setSubdomains] = useState(['mail', 'www', 'blog', 'dev']);
  const [vhosts, setVhosts] = useState(['test.example.com', 'dev.example.com', 'staging.example.com']);

  const runFuzzer = async (fuzzerName, endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFuzzerParams(fuzzerName)),
      });
      const data = await response.json();
      setResults(prev => ({ ...prev, [fuzzerName]: data }));
    } catch (error) {
      console.error(`Error in ${fuzzerName}:`, error);
      setResults(prev => ({ ...prev, [fuzzerName]: `Error: ${error.message}` }));
    }
    setLoading(false);
  };

  const getFuzzerParams = (fuzzerName) => {
    switch (fuzzerName) {
      case 'directoryFuzzer':
        return { baseUrl, directories };
      case 'apiFuzzer':
        return { baseUrl, endpoints: apiEndpoints, methods: apiMethods };
      case 'parameterFuzzer':
        return { baseUrl, endpoint: paramEndpoint, parameters, payloads };
      case 'subdomainDiscovery':
        return { baseUrl, subdomains };
      case 'vhostDiscovery':
        return { baseUrl, vhosts };
      default:
        return { baseUrl };
    }
  };

  const renderResults = (fuzzerName) => {
    const fuzzerResults = results[fuzzerName];
    if (!fuzzerResults) return null;
    if (typeof fuzzerResults === 'string') return <p className="text-red-500">{fuzzerResults}</p>;
    return (
      <ul>
        {fuzzerResults.map((result, index) => (
          <li key={index}>{JSON.stringify(result)}</li>
        ))}
      </ul>
    );
  };

  const renderInputs = () => {
    switch (activeTab) {
      case 'directoryFuzzer':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Directories to Fuzz</h3>
            <input
              type="text"
              value={directories.join(', ')}
              onChange={(e) => setDirectories(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        );
      case 'apiFuzzer':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">API Endpoints</h3>
            <input
              type="text"
              value={apiEndpoints.join(', ')}
              onChange={(e) => setApiEndpoints(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
            <h3 className="text-lg font-semibold mb-2">HTTP Methods</h3>
            <input
              type="text"
              value={apiMethods.join(', ')}
              onChange={(e) => setApiMethods(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        );
      case 'parameterFuzzer':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Endpoint</h3>
            <input
              type="text"
              value={paramEndpoint}
              onChange={(e) => setParamEndpoint(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <h3 className="text-lg font-semibold mb-2">Parameters</h3>
            <input
              type="text"
              value={parameters.join(', ')}
              onChange={(e) => setParameters(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
            <h3 className="text-lg font-semibold mb-2">Payloads</h3>
            <input
              type="text"
              value={payloads.join(', ')}
              onChange={(e) => setPayloads(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        );
      case 'subdomainDiscovery':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Subdomains to Check</h3>
            <input
              type="text"
              value={subdomains.join(', ')}
              onChange={(e) => setSubdomains(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        );
      case 'vhostDiscovery':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">VHosts to Check</h3>
            <input
              type="text"
              value={vhosts.join(', ')}
              onChange={(e) => setVhosts(e.target.value.split(', '))}
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WebFuzzForge Dashboard</h1>
      <input
        type="text"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        placeholder="Enter base URL"
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="mb-4">
        <button onClick={() => setActiveTab('directoryFuzzer')} className={`mr-2 p-2 ${activeTab === 'directoryFuzzer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Directory Fuzzer</button>
        <button onClick={() => setActiveTab('apiFuzzer')} className={`mr-2 p-2 ${activeTab === 'apiFuzzer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>API Fuzzer</button>
        <button onClick={() => setActiveTab('parameterFuzzer')} className={`mr-2 p-2 ${activeTab === 'parameterFuzzer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Parameter Fuzzer</button>
        <button onClick={() => setActiveTab('subdomainDiscovery')} className={`mr-2 p-2 ${activeTab === 'subdomainDiscovery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Subdomain Discovery</button>
        <button onClick={() => setActiveTab('vhostDiscovery')} className={`mr-2 p-2 ${activeTab === 'vhostDiscovery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>VHost Discovery</button>
      </div>
      <div className="border p-4 rounded">
        {renderInputs()}
        <button 
          onClick={() => runFuzzer(activeTab, activeTab.replace(/([A-Z])/g, '-$1').toLowerCase())} 
          disabled={loading} 
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Run {activeTab.replace(/([A-Z])/g, ' $1').trim()}
        </button>
        {renderResults(activeTab)}
      </div>
    </div>
  );
};

export default WebFuzzForgeDashboard;