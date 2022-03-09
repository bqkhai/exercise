import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        desciption: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            //required: true,
        },
    },
    { timestamps: true }
);

export const Exercise = mongoose.model('Exercise', exerciseSchema);
