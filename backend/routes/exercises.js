import express from 'express';
import { Exercise } from '../models/exercise.model.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const exerciseList = await Exercise.find();
        res.status(200).json({ success: true, exerciseList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.route('/add').post(async (req, res) => {
    const { username, desciption, duration } = req.body;
    //const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    if (!username || !desciption || !duration || !date)
        res.status(400).json({
            success: false,
            message: 'Title is required',
        });

    try {
        const newExercise = new Exercise({
            username,
            desciption,
            duration,
            date,
        });

        await newExercise.save();
        res.status(200).json({
            success: true,
            message: 'Create exercise success',
            newExercise,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        res.status(200).json({ success: true, exercise });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.route('/edit/:id').put(async (req, res) => {
    const { username, desciption, duration } = req.body;
    const date = Date.parse(req.body.date);
    if (!username || !desciption || !duration || !date)
        res.status(400).json({
            success: false,
            message: 'Title is required',
        });

    try {
        let updateExercise = { username, desciption, duration, date };
        updateExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            updateExercise,
            { new: true }
        );
        res.status(200).json({ success: true, message: 'Update success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.route('/delete/:id').delete(async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Delete success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
