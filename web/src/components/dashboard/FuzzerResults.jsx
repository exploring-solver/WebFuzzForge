import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const FuzzerResults = ({ results }) => {
  if (!results) return null;
  if (typeof results === 'string') return <Typography color="error">{results}</Typography>;

  return (
    <List>
      {results.map((result, index) => (
        <ListItem key={index}>
          <ListItemText primary={JSON.stringify(result)} />
        </ListItem>
      ))}
    </List>
  );
};

export default FuzzerResults;