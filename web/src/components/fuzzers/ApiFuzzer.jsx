import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import useFuzzer from '../common/useFuzzer';

const ApiFuzzer = ({ selectedTestSite }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const initialEndpoints = ['/api/v1/users', '/api/v1/products'];
  const [methods, setMethods] = useState(['GET', 'POST', 'PUT', 'DELETE']);
  
  const {
    inputs: endpoints,
    results,
    loading,
    handleInputChange,
    handleAddInput,
    handleRemoveInput,
    runFuzzer,
  } = useFuzzer(initialEndpoints, 'apiFuzzer', backendUrl);

  const handleRunFuzzer = () => {
    runFuzzer({ baseUrl: selectedTestSite ? selectedTestSite.url : '', methods ,endpoints});
  };

  const handleMethodToggle = (method) => {
    setMethods(methods.includes(method) 
      ? methods.filter(m => m !== method)
      : [...methods, method]
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">API Fuzzer</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Base URL"
          value={selectedTestSite ? selectedTestSite.url : ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      </Grid>
      {endpoints.map((endpoint, index) => (
        <Grid container item spacing={2} key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={endpoint}
              onChange={(e) => handleInputChange(index, e.target.value)}
              label={`API Endpoint ${index + 1}`}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleAddInput}>Add Endpoint</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">HTTP Methods:</Typography>
        {['GET', 'POST', 'PUT', 'DELETE'].map((method) => (
          <Chip
            key={method}
            label={method}
            onClick={() => handleMethodToggle(method)}
            color={methods.includes(method) ? "primary" : "default"}
            style={{ margin: '0 5px 5px 0' }}
          />
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRunFuzzer}
          disabled={loading}
        >
          Run API Fuzzer
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

export default ApiFuzzer;