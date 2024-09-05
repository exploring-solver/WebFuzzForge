import React from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import useFuzzer from '../common/useFuzzer';

const VhostDiscovery = ({ selectedTestSite }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const initialVhosts = ['test.example.com', 'dev.example.com', 'staging.example.com'];
  
  const {
    inputs: vhosts,
    results,
    loading,
    handleInputChange,
    handleAddInput,
    handleRemoveInput,
    runFuzzer,
  } = useFuzzer(initialVhosts, 'vhostDiscovery', backendUrl, /* token */);

  const handleRunFuzzer = () => {
    runFuzzer({ baseUrl: selectedTestSite ? selectedTestSite.url : '' ,vhosts});
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">VHost Discovery</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Base URL"
          value={selectedTestSite ? selectedTestSite.url : ''}
          disabled
        />
      </Grid>
      {vhosts.map((vhost, index) => (
        <Grid container item spacing={2} key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={vhost}
              onChange={(e) => handleInputChange(index, e.target.value)}
              label={`VHost ${index + 1}`}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleAddInput}>Add VHost</Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRunFuzzer}
          disabled={loading}
        >
          Run VHost Discovery
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

export default VhostDiscovery;