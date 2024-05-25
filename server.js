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

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

app.post('/updateStore', (req, res) => {
    const { storeName, storeAddress, storePhone, storeHours } = req.body;
    
    console.log('Received data:', { storeName, storeAddress, storePhone, storeHours });

    // Query to get the store ID based on the store name
    const selectQuery = 'SELECT id FROM stores WHERE name = ?';
    connection.query(selectQuery, [storeName], (err, results) => {
        if (err) {
            console.error('Error retrieving store ID:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            const storeId = results[0].id;

            // Proceed to update the store details
            const updateQuery = 'UPDATE stores SET address = ?, phone = ?, operating_hours = ? WHERE id = ?';
            connection.query(updateQuery, [storeAddress, storePhone, storeHours, storeId], (err, results) => {
                if (err) {
                    console.error('Error updating store information:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                
                console.log('Update results:', results);
                
                if (results.affectedRows === 0) {
                    res.status(404).send('Store not found');
                    return;
                }

                res.send('Store information updated successfully');
            });
        } else {
            res.status(404).send('Store not found');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
