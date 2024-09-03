import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FolderOpen,
  Api,
  Code,
  Language,
  Public,
  Help,
  Assignment,
} from '@mui/icons-material';
import Navbar from './Navbar';
import ReportList from './ReportList';
import ReportsList from './ReportList';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const WebFuzzForgeDashboard = ({ token, setToken }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [baseUrl, setBaseUrl] = useState(backendUrl);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('directoryFuzzer');

  // State for user inputs
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
      const response = await fetch(`${backendUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
    if (typeof fuzzerResults === 'string') return <Typography color="error">{fuzzerResults}</Typography>;
    return (
      <List>
        {fuzzerResults.map((result, index) => (
          <ListItem key={index}>
            <ListItemText primary={JSON.stringify(result)} />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderInputs = () => {
    switch (activeTab) {
      case 'directoryFuzzer':
        return (
          <TextField
            fullWidth
            label="Directories to Fuzz"
            value={directories.join(', ')}
            onChange={(e) => setDirectories(e.target.value.split(', '))}
            margin="normal"
          />
        );
      case 'apiFuzzer':
        return (
          <>
            <TextField
              fullWidth
              label="API Endpoints"
              value={apiEndpoints.join(', ')}
              onChange={(e) => setApiEndpoints(e.target.value.split(', '))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="HTTP Methods"
              value={apiMethods.join(', ')}
              onChange={(e) => setApiMethods(e.target.value.split(', '))}
              margin="normal"
            />
          </>
        );
      case 'parameterFuzzer':
        return (
          <>
            <TextField
              fullWidth
              label="Endpoint"
              value={paramEndpoint}
              onChange={(e) => setParamEndpoint(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Parameters"
              value={parameters.join(', ')}
              onChange={(e) => setParameters(e.target.value.split(', '))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Payloads"
              value={payloads.join(', ')}
              onChange={(e) => setPayloads(e.target.value.split(', '))}
              margin="normal"
            />
          </>
        );
      case 'subdomainDiscovery':
        return (
          <TextField
            fullWidth
            label="Subdomains to Check"
            value={subdomains.join(', ')}
            onChange={(e) => setSubdomains(e.target.value.split(', '))}
            margin="normal"
          />
        );
      case 'vhostDiscovery':
        return (
          <TextField
            fullWidth
            label="VHosts to Check"
            value={vhosts.join(', ')}
            onChange={(e) => setVhosts(e.target.value.split(', '))}
            margin="normal"
          />
        );
      default:
        return null;
    }
  };

  const toolInfo = {
    directoryFuzzer: "Scans for hidden directories on the target website",
    apiFuzzer: "Tests various API endpoints with different HTTP methods",
    parameterFuzzer: "Fuzzes parameters with payloads to find vulnerabilities",
    subdomainDiscovery: "Discovers subdomains of the target domain",
    vhostDiscovery: "Identifies virtual hosts on the target server",
  };
  const renderContent = () => {
    if (activeTab === 'reports') {
      return <ReportList token={token} />;
    }

    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={11}>
            <TextField
              fullWidth
              label="Base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip title={toolInfo[activeTab]}>
              <IconButton>
                <Help />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {renderInputs()}
        <Button
          variant="contained"
          color="primary"
          onClick={() => runFuzzer(activeTab, activeTab.replace(/([A-Z])/g, '-$1').toLowerCase())}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Run {activeTab.replace(/([A-Z])/g, ' $1').trim()}
        </Button>
        {renderResults(activeTab)}
      </Paper>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar token={token} setToken={setToken}/>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {['directoryFuzzer', 'apiFuzzer', 'parameterFuzzer', 'subdomainDiscovery', 'vhostDiscovery', 'reports'].map((text) => (
            <ListItem className='hover:cursor-pointer' button key={text} onClick={() => setActiveTab(text)} selected={activeTab === text}>
              <ListItemIcon >
                {text === 'directoryFuzzer' && <FolderOpen />}
                {text === 'apiFuzzer' && <Api />}
                {text === 'parameterFuzzer' && <Code />}
                {text === 'subdomainDiscovery' && <Language />}
                {text === 'vhostDiscovery' && <Public />}
                {text === 'reports' && <Assignment />}
              </ListItemIcon>
              <ListItemText primary={text === 'reports' ? 'Reports/Logs' : text.replace(/([A-Z])/g, ' $1').trim()} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={true}>
        <Toolbar />
        {renderContent()}
      </Main>
    </div>
  );
};

export default WebFuzzForgeDashboard;