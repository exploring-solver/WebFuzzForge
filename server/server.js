const express = require('express');
const cors = require('cors');
const DirectoryFuzzer = require('../packages/directory-fuzzer');
const APIFuzzer = require('../packages/api-fuzzer');
const ParameterFuzzer = require('../packages/parameter-fuzzer');
const SubdomainDiscovery = require('../packages/subdomain-discovery');
const VHostDiscovery = require('../packages/vhost-discovery');
const authControllers = require('./controllers/Auth.Controllers');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/directory-fuzzer', async (req, res) => {
  const { baseUrl, directories } = req.body;
  const directoryFuzzer = new DirectoryFuzzer(baseUrl);
  const results = await directoryFuzzer.fuzzDirectories(directories);
  res.json(results);
});

app.post('/api-fuzzer', async (req, res) => {
  const { baseUrl, endpoints, methods } = req.body;
  const apiFuzzer = new APIFuzzer(baseUrl);
  const results = await apiFuzzer.fuzzAPIEndpoints(endpoints, methods);
  res.json(results);
});

app.post('/parameter-fuzzer', async (req, res) => {
  const { baseUrl, endpoint, parameters, payloads } = req.body;
  const parameterFuzzer = new ParameterFuzzer(baseUrl);
  const results = await parameterFuzzer.fuzzParameters(endpoint, parameters, payloads);
  res.json(results);
});

app.post('/subdomain-discovery', async (req, res) => {
  const { baseUrl, subdomains } = req.body;
  const domain = new URL(baseUrl).hostname;
  const subdomainDiscovery = new SubdomainDiscovery();
  const results = await subdomainDiscovery.discoverSubdomains(domain, subdomains);
  res.json(results);
});

app.post('/vhost-discovery', async (req, res) => {
  const { baseUrl, vhosts } = req.body;
  const vhostDiscovery = new VHostDiscovery(baseUrl);
  const results = await vhostDiscovery.discoverVHosts(vhosts);
  res.json(results);
});

app.post('/signup', authControllers.signup);
app.post('/login', authControllers.login);
app.get('/user-details', authMiddleware, authControllers.getUserDetails);
app.post('/generate-report', authMiddleware, authControllers.generateReport);
app.get('/reports', authMiddleware, authControllers.getReports);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));