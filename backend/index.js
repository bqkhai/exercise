import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import exercisesRouter from './routes/exercises.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mvpzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
};

connectDB();

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
