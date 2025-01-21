const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables


const app = express();
const SECRET_KEY = process.env.SECRET_KEY; // Retrieve the secret key from the .env file

app.use(bodyParser.json());

// Route to login and generate a JWT
app.post('/login', (req, res) => {
    const { username, role } = req.body; // Accept username and role from the request body

    if (username && role) {
        const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(400).json({ message: 'Username and role are required!' });
});



// Protected route
app.get('/protected', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token

    console.log('Received Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token!' });
        }
        res.json({ message: 'Welcome!', user: decoded });
    });
});

// an Admin-Only Endpoint
app.get('/admin', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token!' });
        }

        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only!' });
        }

        res.json({ message: 'Welcome, Admin!', user: decoded });
    });
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
