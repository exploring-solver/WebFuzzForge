const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Vulnerable SQL login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Vulnerable SQL query using concatenation to simulate a typical injection vulnerability
      const query = "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password ;
      console.log(query);
      const result = await pool.query(query);
      if (result.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Login failed');
      }
    } catch (error) {
      res.status(500).send(`Internal server error : ${error}`);
    }
  });
  

// Vulnerable blog post endpoint (parameter fuzzer test)
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await pool.query(`SELECT * FROM posts WHERE id = ${id}`);
    res.json(post[0]);
  } catch (error) {
    res.status(500).send(`Error fetching post  : ${error}`);
  }
});

app.get('/api/posts', async (req, res) => {
    try {
      const query = 'SELECT * FROM posts';
      const results = await pool.query(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).send(`Internal server error : ${error}`);
    }
  });

  // Route to add a new post (vulnerable to unauthorized users)
app.post('/api/posts', async (req, res) => {
    const { title, content, image } = req.body;
    try {
      // Simple query without authorization check
      const result = await pool.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, image]);
      res.status(201).send('Post added successfully');
    } catch (error) {
      res.status(500).send(`Internal server error: ${error}`);
    }
  });

// Expose some js files for directory fuzzer
app.get('/public/script.js', (req, res) => {
  res.sendFile(__dirname + '/public/script.js');
});

// Serve static files from /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Show directory listing at /public
app.use('/public', serveIndex(path.join(__dirname, 'public')));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
