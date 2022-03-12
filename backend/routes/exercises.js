import express from 'express';
import { Exercise } from '../models/exercise.model.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const exercises = await Exercise.find();
        return res.status(200).json(exercises);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        return res.status(200).json(exercise);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.route('/add').post(async (req, res) => {
    const { username, description, duration } = req.body;
    const date = Date.parse(req.body.date);

    if (!username || !description || !date)
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    try {
        await newExercise.save();
        return res
            .status(200)
            .json({ success: true, message: 'Create success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.route('/edit/:id').put(async (req, res) => {
    const { username, description, duration } = req.body;
    const date = Date.parse(req.body.date);
    if (!username || !description || !date)
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });

    try {
        let updateExercise = { username, description, duration, date };
        updateExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            updateExercise,
            { new: true }
        );
        return res
            .status(200)
            .json({ success: true, message: 'Update success' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

router.route('/delete/:id').delete(async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        return res
            .status(200)
            .json({ success: true, message: 'Delete success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
