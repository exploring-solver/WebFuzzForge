//not in use just for reference

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Paper, Grid, TextField, Button, Tooltip, IconButton } from '@mui/material';
import { Help, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import FuzzerInputs from './FuzzerInputs';
import FuzzerResults from './FuzzerResults';
import ReportList from '../reports/ReportList';
import TestSiteManager from './TestSiteManager';
import { runFuzzer, getFuzzerParams } from '../utils/fuzzerUtils';
import Navbar from '../Navbar';

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

const toolInfo = {
  directoryFuzzer: "Fuzzes directories on the target website",
  apiFuzzer: "Fuzzes API endpoints with different HTTP methods",
  parameterFuzzer: "Fuzzes parameters with various payloads",
  subdomainDiscovery: "Discovers subdomains of the target domain",
  vhostDiscovery: "Discovers virtual hosts on the target server",
};

const WebFuzzForgeDashboard = ({ token, setToken }) => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [baseUrl, setBaseUrl] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('directoryFuzzer');
  const [selectedTestSite, setSelectedTestSite] = useState(null);

  useEffect(() => {
    if (siteId) {
      fetchTestSite(siteId);
    }
  }, [siteId]);

  const fetchTestSite = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/test-sites/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const site = await response.json();
      setSelectedTestSite(site);
      setBaseUrl(site.url);
    } catch (error) {
      console.error('Error fetching test site:', error);
    }
  };

  const handleRunFuzzer = async () => {
    setLoading(true);
    const newResults = await runFuzzer(activeTab, backendUrl, token, getFuzzerParams(activeTab, baseUrl));
    setResults(prev => ({ ...prev, [activeTab]: newResults }));
    setLoading(false);
  };

  const renderContent = () => {
    if (!siteId) {
      return <TestSiteManager token={token} onSelectTestSite={(site) => navigate(`/dashboard/${site._id}`)} />;
    }

    if (activeTab === 'reports') {
      return <ReportList token={token} />;
    }

    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <IconButton onClick={() => navigate('/dashboard')}>
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
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
        <FuzzerInputs activeTab={activeTab} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRunFuzzer}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Run {activeTab.replace(/([A-Z])/g, ' $1').trim()}
        </Button>
        <FuzzerResults results={results[activeTab]} />
      </Paper>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar token={token} setToken={setToken} />
      </AppBar>
      {siteId && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
      <Main open={true}>
        <Toolbar />
        {renderContent()}
      </Main>
    </div>
  );
};

export default WebFuzzForgeDashboard;