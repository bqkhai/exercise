import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
