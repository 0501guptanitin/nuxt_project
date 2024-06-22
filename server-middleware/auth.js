const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nitin@123',
  database: 'nuxt_auth',
  connectTimeout: 10000 // 10 seconds
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Register route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'test', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

app.get('/me', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'test', (err, user) => {
    if (err) {
      console.error('Error verifying JWT token:', err);
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

app.get('/users', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM users LIMIT ? OFFSET ?';
  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const countQuery = 'SELECT COUNT(*) as count FROM users';
    db.query(countQuery, (countErr, countResults) => {
      if (countErr) {
        console.error('Error fetching users count:', countErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const totalCount = countResults[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      res.json({
        users: results,
        pagination: {
          totalItems: totalCount,
          totalPages: totalPages,
          currentPage: page
        }
      });
    });
  });
});

// Add a book
app.post('/books', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { bookName, authorName, publishedOn } = req.body;

  const query = 'INSERT INTO books (userId, bookName, authorName, publishedOn) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, bookName, authorName, publishedOn], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Book added' });
  });
});

// Edit a book
app.put('/books/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  const { bookName, authorName, publishedOn } = req.body;

  const query = 'UPDATE books SET bookName = ?, authorName = ?, publishedOn = ? WHERE id = ? AND userId = ?';
  db.query(query, [bookName, authorName, publishedOn, bookId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Book updated' });
  });
});

// Delete a book
app.delete('/books/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  const query = 'DELETE FROM books WHERE id = ? AND userId = ?';
  db.query(query, [bookId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Book deleted' });
  });
});

// Get all books for a user
app.get('/books', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM books WHERE userId = ? LIMIT ? OFFSET ?';
  db.query(query, [userId, limit, offset], (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const countQuery = 'SELECT COUNT(*) as count FROM books WHERE userId = ?';
    db.query(countQuery, [userId], (countErr, countResults) => {
      if (countErr) {
        console.error('Error fetching books count:', countErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const totalCount = countResults[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      res.json({
        books: results,
        pagination: {
          totalItems: totalCount,
          totalPages: totalPages,
          currentPage: page
        }
      });
    });
  });
});


module.exports = app;

app.listen(4000, () => {
  console.log('Server running on http://127.0.0.1:4000');
});
