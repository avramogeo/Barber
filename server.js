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

    const query = 'UPDATE stores SET name = ?, address = ?, phone = ?, operating_hours = ? WHERE name = ?';
    connection.query(query, [storeName, storeAddress, storePhone, storeHours, storeName], (err, results) => {
        if (err) {
            console.error('Error updating store:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Store updated:', results);
        res.send('Store information updated successfully');
    });
});

app.post('/addHairdresser', (req, res) => {
    const { hairdresserName, date, timeSlots } = req.body;

    const insertHairdresserQuery = 'INSERT INTO hairdressers (name) VALUES (?)';
    connection.query(insertHairdresserQuery, [hairdresserName], (err, results) => {
        if (err) {
            console.error('Error adding hairdresser:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const hairdresserId = results.insertId;

        const insertAvailableSlotsQuery = 'INSERT INTO available_slots (hairdresser_id, date, start_time, end_time) VALUES ?';
        const values = timeSlots.map(slot => {
            const [start_time, end_time] = slot.split('-');
            return [hairdresserId, date, start_time, end_time];
        });

        connection.query(insertAvailableSlotsQuery, [values], (err, results) => {
            if (err) {
                console.error('Error adding available slots:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('Available slots added:', results);
            res.send('Hairdresser and available hours added successfully');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
