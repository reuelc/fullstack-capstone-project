const express = require('express');
const { connectToDatabase } = require('../models/db');
const router = express.Router();

// Login route with collection.findOne() method
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Connect to database
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        // Task 11 Requirement: Use collection.findOne() to find current user
        const user = await collection.findOne({ email: email });
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // Simple password check (in real app, use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.status(200).json({ 
            message: 'Login successful',
            user: { email: user.email, firstName: user.firstName }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        // Check if user already exists using collection.findOne()
        const existingUser = await collection.findOne({ email: email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Insert new user
        const newUser = await collection.insertOne({
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date()
        });
        
        res.status(201).json({ 
            message: 'User registered successfully',
            userId: newUser.insertedId
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
