import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app,server } from './socket.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(process.env.PORT || 5000, () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(error => console.error('MongoDB connection error:', error));
    
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
