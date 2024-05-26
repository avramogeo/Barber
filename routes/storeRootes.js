const express = require('express');
const router = express.Router();
const db = require('../database'); // Assuming db.js handles the DB connection

router.post('/updateStore', (req, res) => {
    const { storeName, storeAddress, storePhone, storeHours } = req.body;
    const query = 'UPDATE stores SET name = ?, address = ?, phone = ?, operating_hours = ? WHERE id = 1'; // Adjust the condition as needed
    db.query(query, [storeName, storeAddress, storePhone, storeHours], (err, result) => {
        if (err) {
            console.error('Error updating store information:', err);
            res.status(500).send('Error updating store information');
            return;
        }
        res.send('Store information updated successfully');
    });
});

module.exports = router;
