const express = require('express');
const db = require('./database');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve HTML, CSS, JS files from the "public" folder

// API: Add a new user
app.post('/api/users', (req, res) => {
    const { name, email, role } = req.body;
    db.run(`INSERT INTO users (name, email, role) VALUES (?, ?, ?)`, [name, email, role], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// API: Fetch all users
app.get('/api/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});