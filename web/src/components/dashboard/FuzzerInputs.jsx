import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const FuzzerInputs = ({ activeTab }) => {
  const [directories, setDirectories] = useState(['admin', 'config', 'backup', 'test']);
  const [apiEndpoints, setApiEndpoints] = useState(['/api/v1/users', '/api/v1/products']);
  const [apiMethods, setApiMethods] = useState(['GET', 'POST', 'PUT', 'DELETE']);
  const [paramEndpoint, setParamEndpoint] = useState('/search');
  const [parameters, setParameters] = useState(['q', 'sort']);
  const [payloads, setPayloads] = useState(["'", "\"", "<script>", "1=1"]);
  const [subdomains, setSubdomains] = useState(['mail', 'www', 'blog', 'dev']);
  const [vhosts, setVhosts] = useState(['test.example.com', 'dev.example.com', 'staging.example.com']);

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

export default FuzzerInputs;