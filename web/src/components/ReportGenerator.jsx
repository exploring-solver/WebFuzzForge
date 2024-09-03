import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const ReportGenerator = () => {
  const [toolName, setToolName] = useState('');
  const [output, setOutput] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${backendUrl}/generate-report`, { toolName, output }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Report generated successfully');
    } catch (error) {
      console.error('Report generation failed', error);
    }
  };

  return (
    <Container>
      <h1 className='text-center text-3xl py-4'>Generate Report</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <TextField label="Tool Name" fullWidth value={toolName} onChange={(e) => setToolName(e.target.value)} />
        <TextField label="Output" fullWidth value={output} onChange={(e) => setOutput(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">Generate Report</Button>
      </form>
    </Container>
  );
};

export default ReportGenerator;
