const DirectoryFuzzer = require('./packages/directory-fuzzer');
const VHostDiscovery = require('./packages/vhost-discovery');
const APIFuzzer = require('./packages/api-fuzzer');
const ParameterFuzzer = require('./packages/parameter-fuzzer');
const CustomTestEngine = require('./packages/custom-test-engine');
const SubdomainDiscovery = require('./packages/subdomain-discovery');
const ReportGenerator = require('./packages/reporting');
const MitigationEngine = require('./packages/mitigation-engine');

async function runWebFuzzForge(targetUrl) {
  const results = {};
  
  // Run all the tools
  const directoryFuzzer = new DirectoryFuzzer(targetUrl);
  results.directories = await directoryFuzzer.fuzzDirectories(['admin', 'login', 'api']);

  const vhostDiscovery = new VHostDiscovery(targetUrl);
  results.vhosts = await vhostDiscovery.discoverVHosts(['dev', 'staging', 'test']);

  const apiFuzzer = new APIFuzzer(targetUrl);
  results.api = await apiFuzzer.fuzzAPIEndpoints(['/api/users', '/api/products'], ['GET', 'POST']);

  const parameterFuzzer = new ParameterFuzzer(targetUrl);
  results.parameters = await parameterFuzzer.fuzzParameters('/search', ['q', 'id'], ["'", "<script>", "1 OR 1=1"]);

  const customTestEngine = new CustomTestEngine(targetUrl);
  results.customTest = await customTestEngine.runCustomTest({
    endpoint: '/login',
    method: 'POST',
    body: { username: 'admin', password: 'password' }
  });

  const subdomainDiscovery = new SubdomainDiscovery();
  results.subdomains = await subdomainDiscovery.discoverSubdomains('example.com', ['www', 'mail', 'ftp']);

  // Generate report
  const reportGenerator = new ReportGenerator();
  const report = reportGenerator.generateReport(results);
  console.log(report);

  // Suggest mitigations
  const mitigationEngine = new MitigationEngine();
  for (const [toolName, toolResults] of Object.entries(results)) {
    if (toolResults.length > 0) {
      console.log(`Mitigation for ${toolName}: ${mitigationEngine.suggestMitigation(toolName)}`);
    }
  }
}

runWebFuzzForge('https://example.com');