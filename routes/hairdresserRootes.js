const express = require('express');
const router = express.Router();
const db = require('../database'); // Assuming db.js handles the DB connection

router.post('/addHairdresser', (req, res) => {
    const { hairdresserName, date, timeSlots } = req.body;

    const insertHairdresserQuery = 'INSERT INTO hairdressers (name, store_id) VALUES (?, 1)'; // Adjust store_id as needed
    db.query(insertHairdresserQuery, [hairdresserName], (err, result) => {
        if (err) {
            console.error('Error adding hairdresser:', err);
            res.status(500).send('Error adding hairdresser');
            return;
        }

        const hairdresserId = result.insertId;
        const insertSlotsQuery = 'INSERT INTO available_slots (hairdresser_id, date, start_time, end_time) VALUES ?';
        const slotsValues = timeSlots.map(slot => {
            const [start_time, end_time] = slot.split('-');
            return [hairdresserId, date, start_time, end_time];
        });

        db.query(insertSlotsQuery, [slotsValues], (err, result) => {
            if (err) {
                console.error('Error adding available slots:', err);
                res.status(500).send('Error adding available slots');
                return;
            }

            res.send('Hairdresser and available slots added successfully');
        });
    });
});

module.exports = router;
