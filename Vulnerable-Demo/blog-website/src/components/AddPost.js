import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        imageUrl,
      });
      setSuccess('Post added successfully!');
      setTitle('');
      setContent('');
      setImageUrl('');
      setError('');
    } catch (error) {
      setError('Error adding post.');
      console.error('Error adding post:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Add Post
          </Button>
        </Box>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="success" mt={2}>{success}</Typography>}
      </Box>
    </Container>
  );
}

export default AddPost;
