import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const TestSiteManager = ({ token, onSelectTestSite }) => {
  const [testSites, setTestSites] = useState([]);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');

  useEffect(() => {
    fetchTestSites();
  }, []);

  const fetchTestSites = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-sites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTestSites(data);
    } catch (error) {
      console.error('Error fetching test sites:', error);
    }
  };

  const addTestSite = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-sites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newSiteName, url: newSiteUrl }),
      });
      if (response.ok) {
        setNewSiteName('');
        setNewSiteUrl('');
        fetchTestSites();
      }
    } catch (error) {
      console.error('Error adding test site:', error);
    }
  };

  const deleteTestSite = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test-sites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchTestSites();
      }
    } catch (error) {
      console.error('Error deleting test site:', error);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Manage Test Sites
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Site Name"
            value={newSiteName}
            onChange={(e) => setNewSiteName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Site URL"
            value={newSiteUrl}
            onChange={(e) => setNewSiteUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addTestSite}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <List>
        {testSites.map((site) => (
          <ListItem key={site._id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTestSite(site._id)}>
              <Delete />
            </IconButton>
          }>
            <ListItemText
              primary={site.name}
              secondary={site.url}
              onClick={() => onSelectTestSite(site)}
              sx={{ cursor: 'pointer' }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TestSiteManager;