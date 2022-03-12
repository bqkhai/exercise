import express from 'express';
import { User } from '../models/user.model.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.route('/add').post(async (req, res) => {
    const username = req.body.username;

    if (!username)
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    try {
        const newUser = new User({ username });
        await newUser.save();

        return res.status(200).json({ success: true, message: 'Add success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
