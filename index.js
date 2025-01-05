// Importeren van de express module in node_modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('./classes/database.js');

// Aanmaken van een express app
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware om JSON-requests te parsen
app.use(bodyParser.json());

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example of an API route to fetch data from the database
app.get('/api/data', async (req, res) => {
    try {
        const db = new Database();
        // Query the database using your existing method
        const sql = 'SELECT * FROM users'; // Modify this query as needed
        const rows = await db.getQuery(sql);

        res.json(rows); // Send the fetched data as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Database query failed', details: error.message });
    }
});

// Example of a POST route to insert data into the database
app.post('/api/data', async (req, res) => {
    try {
        const { name, age } = req.body; // Assuming you want to insert data with these fields
        const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
        await db.getQuery(sql, [name, age]);

        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to insert data', details: error.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
