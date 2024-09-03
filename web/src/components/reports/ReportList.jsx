import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const ReportList = ({ token }) => {
  const [reports, setReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleExpandReport = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Scan Reports and Logs
      </Typography>
      <List>
        {reports.map((report) => (
          <React.Fragment key={report._id}>
            <ListItem>
              <ListItemText
                primary={`${report.toolName} - ${report.url}`}
                secondary={new Date(report.executionTime).toLocaleString()}
              />
              <IconButton onClick={() => handleExpandReport(report._id)}>
                {expandedReport === report._id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={expandedReport === report._id} timeout="auto" unmountOnExit>
              <Paper elevation={0} sx={{ p: 2, ml: 2, bgcolor: 'background.default' }}>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(report.results, null, 2)}
                </Typography>
              </Paper>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ReportList;