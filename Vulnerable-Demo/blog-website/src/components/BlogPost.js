import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, AppBar, Toolbar, Button, Footer } from '@mui/material';
import { Link } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Blog
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Toolbar>
      </AppBar>

      <Container>
        {loading ? (
          <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />
        ) : (
          <Card style={{ marginTop: '20px' }}>
            {post.image && (
              <CardMedia
                component="img"
                alt="Post image"
                height="40"
                // image={post.image}
                title={post.title}
              />
            )}
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>

      <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Blog. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default BlogPost;
