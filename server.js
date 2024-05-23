// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connection = require('./database'); // Import connection object

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username } = req.body;

    // Log the received username to verify it's correctly parsed
    console.log('Received username:', username);

    // Query the database to check if the username exists
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send("Internal Server Error");
            return;
        }

        // Log the results of the query
        console.log('Query results:', results);

        // Check if results are returned
        if (results.length > 0) {
            // User found
            console.log('User found:', results[0]);
            res.json({ success: true });
        } else {
            // No results, user does not exist
            console.log('User does not exist');
            res.json({ success: false });
        }
    });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.get('/store/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
