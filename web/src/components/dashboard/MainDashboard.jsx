import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Paper, Grid } from '@mui/material';
import DirectoryFuzzer from '../fuzzers/DirectoryFuzzer';
import ApiFuzzer from '../fuzzers/ApiFuzzer';
import ParameterFuzzer from '../fuzzers/ParameterFuzzer';
import SubdomainDiscovery from '../fuzzers/SubdomainDiscovery';
import VhostDiscovery from '../fuzzers/VhostDiscovery';
import TestSiteManager from './TestSiteManager';
import ReportList from '../reports/ReportList';
import Sidebar from '../common/Sidebar';
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

const MainDashboard = ({ token, setToken }) => {
  const [activeTab, setActiveTab] = useState('directoryFuzzer');
  const [selectedTestSite, setSelectedTestSite] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'directoryFuzzer':
        return <DirectoryFuzzer selectedTestSite={selectedTestSite} />;
      case 'apiFuzzer':
        return <ApiFuzzer selectedTestSite={selectedTestSite} />;
      case 'parameterFuzzer':
        return <ParameterFuzzer selectedTestSite={selectedTestSite} />;
      case 'subdomainDiscovery':
        return <SubdomainDiscovery selectedTestSite={selectedTestSite} />;
      case 'vhostDiscovery':
        return <VhostDiscovery selectedTestSite={selectedTestSite} />;
      case 'reports':
        return <ReportList token={token} />;
      case 'testSites':
        return <TestSiteManager token={token} onSelectTestSite={setSelectedTestSite} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar token={token} setToken={setToken} />
      </AppBar>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Main open={true}>
        <Toolbar />
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={2}>
            {renderContent()}
          </Grid>
        </Paper>
      </Main>
    </div>
  );
};

export default MainDashboard;