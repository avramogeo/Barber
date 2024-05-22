const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'avra',
    password: 'avramo33',
    database: 'barber'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection;
