import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { FolderOpen, Api, Code, Language, Public, Assignment } from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { text: 'Test Sites', value: 'testSites', icon: <Public /> },
    { text: 'Directory Fuzzer', value: 'directoryFuzzer', icon: <FolderOpen /> },
    { text: 'API Fuzzer', value: 'apiFuzzer', icon: <Api /> },
    { text: 'Parameter Fuzzer', value: 'parameterFuzzer', icon: <Code /> },
    { text: 'Subdomain Discovery', value: 'subdomainDiscovery', icon: <Language /> },
    { text: 'VHost Discovery', value: 'vhostDiscovery', icon: <Public /> },
    { text: 'Reports/Logs', value: 'reports', icon: <Assignment /> },
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