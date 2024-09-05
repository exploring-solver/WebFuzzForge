import React from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import useFuzzer from '../common/useFuzzer';

const SubdomainDiscovery = ({ selectedTestSite }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const initialSubdomains = ['mail', 'www', 'blog', 'dev'];
  
  const {
    inputs: subdomains,
    results,
    loading,
    handleInputChange,
    handleAddInput,
    handleRemoveInput,
    runFuzzer,
  } = useFuzzer(initialSubdomains, 'subdomainDiscovery', backendUrl, /* token */);

  const handleRunFuzzer = () => {
    runFuzzer({ baseUrl: selectedTestSite ? selectedTestSite.url : '' , subdomains});
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Subdomain Discovery</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Base URL"
          value={selectedTestSite ? selectedTestSite.url : ''}
          disabled
        />
      </Grid>
      {subdomains.map((subdomain, index) => (
        <Grid container item spacing={2} key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={subdomain}
              onChange={(e) => handleInputChange(index, e.target.value)}
              label={`Subdomain ${index + 1}`}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleAddInput}>Add Subdomain</Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRunFuzzer}
          disabled={loading}
        >
          Run Subdomain Discovery
        </Button>
      </Grid>
      {results && (
        <Grid item xs={12}>
          <Typography variant="h6">Results:</Typography>
          <List>
            {results.map((result, index) => (
              <ListItem key={index}>
                <ListItemText primary={JSON.stringify(result)} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default SubdomainDiscovery;