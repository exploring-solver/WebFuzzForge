const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const DirectoryFuzzer = require('../packages/directory-fuzzer');
const APIFuzzer = require('../packages/api-fuzzer');
const ParameterFuzzer = require('../packages/parameter-fuzzer');
const SubdomainDiscovery = require('../packages/subdomain-discovery');
const VHostDiscovery = require('../packages/vhost-discovery');
const authControllers = require('./controllers/Auth.Controllers');
const authMiddleware = require('./middlewares/auth');
const ReportGenerator = require('./controllers/Report.controller');
const testSiteControllers = require('./controllers/TestSite.controllers');
const AdvancedDirectoryFuzzer = require('../packages/directory-fuzzer');
const app = express();
app.use(cors());
app.use(express.json());

require('./db');

const reportGenerator = new ReportGenerator();

app.get('/',(req,res)=>{
  res.json("hello pgdms devs here")
})

// app.post('/directory-fuzzer', authMiddleware, async (req, res) => {
//   try {
//     const { baseUrl, wordlist, extensions, maxDepth } = req.body;

//     const directoryFuzzer = new AdvancedDirectoryFuzzer(baseUrl);

//     const results = await directoryFuzzer.fuzzDirectoriesAndFiles(wordlist, extensions, maxDepth);

//     // Test for vulnerabilities
//     const vulnerabilities = await directoryFuzzer.testVulnerabilities();
//     results.vulnerabilities = vulnerabilities;

//     console.log(req.user);

//     await reportGenerator.generateReport(req.user.userId, baseUrl, 'Directory Fuzzer', results);

//     res.json(results);
//   } catch (error) {
//     console.error('Error in /directory-fuzzer:', error);
//     res.status(500).json({ error: 'An error occurred while fuzzing directories' });
//   }
// });
app.post('/directory-fuzzer',authMiddleware, async (req, res) => {
  const { baseUrl, directories } = req.body;
  const directoryFuzzer = new DirectoryFuzzer(baseUrl);
  const results = await directoryFuzzer.fuzzDirectories(directories);
  console.log(req.user);
  await reportGenerator.generateReport(req.user.userId, baseUrl, 'Directory Fuzzer', results);
  res.json(results);
});

app.post('/api-fuzzer',authMiddleware, async (req, res) => {
  const { baseUrl, endpoints, methods } = req.body;
  const apiFuzzer = new APIFuzzer(baseUrl);
  const results = await apiFuzzer.fuzzAPIEndpoints(endpoints, methods);
  await reportGenerator.generateReport(req.user.userId, baseUrl, 'API Fuzzer', results);
  res.json(results);
});

app.post('/parameter-fuzzer',authMiddleware, async (req, res) => {
  const { baseUrl, endpoint, parameters, payloads } = req.body;
  const parameterFuzzer = new ParameterFuzzer(baseUrl);
  const results = await parameterFuzzer.fuzzParameters(endpoint, parameters, payloads);
  await reportGenerator.generateReport(req.user.userId, baseUrl, 'Parameter Fuzzer', results);
  res.json(results);
});

app.post('/subdomain-discovery',authMiddleware, async (req, res) => {
  const { baseUrl, subdomains } = req.body;
  const domain = new URL(baseUrl).hostname;
  const subdomainDiscovery = new SubdomainDiscovery();
  const results = await subdomainDiscovery.discoverSubdomains(domain, subdomains);
  await reportGenerator.generateReport(req.user.userId, baseUrl, 'Subdomain Discovery', results);
  res.json(results);
});

app.post('/vhost-discovery',authMiddleware, async (req, res) => {
  const { baseUrl, vhosts } = req.body;
  const vhostDiscovery = new VHostDiscovery(baseUrl);
  const results = await vhostDiscovery.discoverVHosts(vhosts);
  await reportGenerator.generateReport(req.user.userId, baseUrl, 'VHost Discovery', results);
  res.json(results);
});

app.post('/signup', authControllers.signup);
app.post('/login', authControllers.login);
app.get('/user-details', authMiddleware, authControllers.getUserDetails);

app.get('/reports', authMiddleware, async (req, res) => {
  try {
    const reports = await reportGenerator.getReports(req.user.userId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
});

app.get('/report/:id', authMiddleware, async (req, res) => {
  try {
    const report = await reportGenerator.getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    if (report.user.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching report' });
  }
});
app.post('/test-sites', authMiddleware, testSiteControllers.addTestSite);
app.get('/test-sites', authMiddleware, testSiteControllers.getTestSites);
app.delete('/test-sites/:id', authMiddleware, testSiteControllers.deleteTestSite);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));