import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const MonitoringDashboard = () => {
  const vulnerabilitiesData = [
    { name: 'SQL Injection', value: 15 },
    { name: 'XSS', value: 23 },
    { name: 'CSRF', value: 8 },
    { name: 'Directory Traversal', value: 12 },
    { name: 'File Inclusion', value: 7 },
  ];

  const requestsPerDayData = [
    { day: 'Mon', requests: 0 },
    { day: 'Tue', requests: 0 },
    { day: 'Wed', requests: 10 },
    { day: 'Thu', requests: 25 },
    { day: 'Fri', requests: 100},
    { day: 'Sat', requests:  140},
    { day: 'Sun', requests: 320 },
  ];

  const componentsTestedData = [
    { name: 'Directories', value: 35 },
    { name: 'API Endpoints', value: 25 },
    { name: 'Parameters', value: 20 },
    { name: 'Subdomains', value: 15 },
    { name: 'VHosts', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-4">
      {/* <Typography variant="h4" className="mb-4">Monitoring Dashboard</Typography> */}
      <Grid container spacing={4}>
        {/* Vulnerabilities Detected */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Vulnerabilities Detected</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vulnerabilitiesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Requests per Day */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Requests per Day (Last Week)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={requestsPerDayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="requests" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Components Tested */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Components Tested</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={componentsTestedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {componentsTestedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Statistics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Summary Statistics</Typography>
              <div className="mt-4 space-y-2">
                <Typography>Total Requests: 440</Typography>
                <Typography>Unique Vulnerabilities: 65</Typography>
                <Typography>Average Response Time: N/A</Typography>
                <Typography>Success Rate: n/a</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MonitoringDashboard;