require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Serve HTML files
app.get('/', (req, res) => res.sendFile(__dirname + '/views/signup.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/home', (req, res) => res.sendFile(__dirname + '/views/home.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    pool.connect()
        .then(() => console.log('Connected to PostgreSQL'))
        .catch(err => console.error('Connection error', err.stack));
});
