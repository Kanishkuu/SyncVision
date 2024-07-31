import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'; // Ensure correct path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', userRoutes); // Ensure this matches the frontend fetch path

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
