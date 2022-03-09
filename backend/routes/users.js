import express from 'express';
import { User } from '../models/user.model.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json({ success: true, userList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.route('/add').post(async (req, res) => {
    const username = req.body.username;

    if (!username)
        res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    try {
        const newUser = new User({ username });
        await newUser.save();

        res.status(200).json({ success: true, message: 'Add success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
