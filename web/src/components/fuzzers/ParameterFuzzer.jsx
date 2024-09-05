import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import useFuzzer from '../common/useFuzzer';

const ParameterFuzzer = ({ selectedTestSite }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const initialParameters = ['q', 'sort'];
  const [endpoint, setEndpoint] = useState('/search');
  const [payloads, setPayloads] = useState(["'", "\"", "<script>", "1=1"]);
  
  const {
    inputs: parameters,
    results,
    loading,
    handleInputChange,
    handleAddInput,
    handleRemoveInput,
    runFuzzer,
  } = useFuzzer(initialParameters, 'parameterFuzzer', backendUrl, /* token */);

  const handleRunFuzzer = () => {
    runFuzzer({ 
      baseUrl: selectedTestSite ? selectedTestSite.url : '',
      endpoint,
      payloads,
      parameters
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Parameter Fuzzer</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Base URL"
          value={selectedTestSite ? selectedTestSite.url : ''}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </Grid>
      {parameters.map((parameter, index) => (
        <Grid container item spacing={2} key={index} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={parameter}
              onChange={(e) => handleInputChange(index, e.target.value)}
              label={`Parameter ${index + 1}`}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleAddInput}>Add Parameter</Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Payloads (comma-separated)"
          value={payloads.join(', ')}
          onChange={(e) => setPayloads(e.target.value.split(',').map(p => p.trim()))}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRunFuzzer}
          disabled={loading}
        >
          Run Parameter Fuzzer
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

export default ParameterFuzzer;