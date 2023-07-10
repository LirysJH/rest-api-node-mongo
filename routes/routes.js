const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// POST - create a new user
router.post('/createUser', async (req, res) => {
    const userData = new UserModel({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const data = await userData.save();

        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
})

// GET - get all users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await UserModel.find();

        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// GET - get by ID
router.get('/getUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);

        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// PATCH - update user by id
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const options = { new: true };
        const result = await UserModel.findByIdAndUpdate(userId, data, options);

        res.send(result);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// DELETE - delete user by id
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserModel.findByIdAndDelete(userId);

        res.send(`Deleted user with userId ${userId}`);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;