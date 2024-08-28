import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import { Server } from 'socket.io';
import http from 'http';
import authRoutes from './routes/auth.route.js'; 
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies to be sent
  },
  transports: ['websocket', 'polling'],
});

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(error => console.error('MongoDB connection error:', error));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('draw', (data) => {
    socket.to(data.roomId).emit('draw', data.line);
  });

  socket.on('clear', (data) => {
    io.to(data.roomId).emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}); 


app.use("/api/auth", authRoutes); 
app.use("/api/messages",messageRoutes);
app.use("/api/users", userRoutes);


server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
