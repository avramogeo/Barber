// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { checkUser, addUser} = require('./database'); // Import connection object
const connection = require('./database');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    
    // Query the database to check if the username exists
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send("Internal Server Error");
            return;
        }

        // Check if results are returned
        if (results.length > 0) {
            // User found
            res.json({ success: true });
        } else {
            // No results, user does not exist
            res.status(401).json({ success: false, message: "User does not exist" });
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
