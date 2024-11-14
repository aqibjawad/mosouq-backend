import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
    .connect(process.env.DB_URL as string, {})
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(e => {
        console.error('Connection error:', e.message);
    });

const db = mongoose.connection;

export default db;
