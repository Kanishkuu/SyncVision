import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import userRoutes from './routes/user.route.js'; 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// Routes
app.use('/api/auth', userRoutes); // Ensure this matches the frontend fetch path

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
