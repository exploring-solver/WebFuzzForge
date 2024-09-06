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
  Remove,
  Add,
} from '@mui/icons-material';
import Navbar from './Navbar';
import ReportList from './reports/ReportList';
import ReportsList from './reports/ReportList';
import TestSiteManager from './dashboard/TestSiteManager';

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

const DictDashboard = ({ token, setToken }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [baseUrl, setBaseUrl] = useState(backendUrl);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('directoryFuzzer');
  const [selectedTestSite, setSelectedTestSite] = useState(null);
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
  const toolInfo = {
    directoryFuzzer: "Scans for hidden directories on the target website",
    apiFuzzer: "Tests various API endpoints with different HTTP methods",
    parameterFuzzer: "Fuzzes parameters with payloads to find vulnerabilities",
    subdomainDiscovery: "Discovers subdomains of the target domain",
    vhostDiscovery: "Identifies virtual hosts on the target server",
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

  const handleAddInput = (stateSetter, currentState) => {
    stateSetter([...currentState, '']);
  };

  const handleRemoveInput = (stateSetter, currentState, index) => {
    const newState = [...currentState];
    newState.splice(index, 1);
    stateSetter(newState);
  };

  const handleInputChange = (stateSetter, currentState, index, value) => {
    const newState = [...currentState];
    newState[index] = value;
    stateSetter(newState);
  };

  const renderInputs = () => {
    const renderInputGroup = (label, state, stateSetter) => (
      <>
        <Typography variant="subtitle1">{label}</Typography>
        {state.map((value, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={value}
                onChange={(e) => handleInputChange(stateSetter, state, index, e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveInput(stateSetter, state, index)}>
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<Add />}
          onClick={() => handleAddInput(stateSetter, state)}
        >
          Add {label}
        </Button>
      </>
    );

    switch (activeTab) {
      case 'directoryFuzzer':
        return renderInputGroup("Directories to Fuzz", directories, setDirectories);
      case 'apiFuzzer':
        return (
          <>
            {renderInputGroup("API Endpoints", apiEndpoints, setApiEndpoints)}
            {renderInputGroup("HTTP Methods", apiMethods, setApiMethods)}
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
            {renderInputGroup("Parameters", parameters, setParameters)}
            {renderInputGroup("Payloads", payloads, setPayloads)}
          </>
        );
      case 'subdomainDiscovery':
        return renderInputGroup("Subdomains to Check", subdomains, setSubdomains);
      case 'vhostDiscovery':
        return renderInputGroup("VHosts to Check", vhosts, setVhosts);
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeTab === 'reports') {
      return <ReportList token={token} />;
    }

    if (activeTab === 'testSites') {
      return <TestSiteManager token={token} onSelectTestSite={setSelectedTestSite} />;
    }

    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={11}>
            <TextField
              fullWidth
              label="Base URL"
              value={selectedTestSite ? selectedTestSite.url : baseUrl}
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
          {['directoryFuzzer', 'apiFuzzer', 'parameterFuzzer', 'subdomainDiscovery', 'vhostDiscovery', 'reports', 'testSites'].map((text) => (
            <ListItem className='hover:cursor-pointer' button key={text} onClick={() => setActiveTab(text)} selected={activeTab === text}>
              <ListItemIcon >
                {text === 'directoryFuzzer' && <FolderOpen />}
                {text === 'apiFuzzer' && <Api />}
                {text === 'parameterFuzzer' && <Code />}
                {text === 'subdomainDiscovery' && <Language />}
                {text === 'vhostDiscovery' && <Public />}
                {text === 'reports' && <Assignment />}
                {text === 'testSites' && <Public />}
              </ListItemIcon>
              <ListItemText primary={text === 'reports' ? 'Reports/Logs' : text === 'testSites' ? 'Test Sites' : text.replace(/([A-Z])/g, ' $1').trim()} />
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

export default DictDashboard;