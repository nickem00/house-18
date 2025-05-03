import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/express.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);  
    })
