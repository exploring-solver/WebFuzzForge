import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { FolderOpen, Api, Code, Language, Public, Assignment } from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { text: 'Directory Fuzzer', icon: <FolderOpen />, value: 'directoryFuzzer' },
    { text: 'API Fuzzer', icon: <Api />, value: 'apiFuzzer' },
    { text: 'Parameter Fuzzer', icon: <Code />, value: 'parameterFuzzer' },
    { text: 'Subdomain Discovery', icon: <Language />, value: 'subdomainDiscovery' },
    { text: 'VHost Discovery', icon: <Public />, value: 'vhostDiscovery' },
    { text: 'Reports/Logs', icon: <Assignment />, value: 'reports' },
    { text: 'Test Sites', icon: <Public />, value: 'testSites' },
  ];

  return (
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
        {menuItems.map((item) => (
          <ListItem
          className='hover:cursor-pointer'
            button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            selected={activeTab === item.value}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;