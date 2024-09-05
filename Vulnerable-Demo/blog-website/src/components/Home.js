import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SecureBlog
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Welcome to SecureBlog
            </Typography>
            <Typography variant="body1">
              Dive into a collection of insightful posts that explore the latest trends in technology, security, and more.
              Whether you're a beginner or a pro, you'll find content that matches your interests. Feel free to explore our posts below!
            </Typography>
          </Grid>

          {posts.map(post => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card>
                <CardContent>
                  <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h5" color="primary">
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <footer style={{ marginTop: '2rem', padding: '1rem 0', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 SecureBlog. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default Home;
