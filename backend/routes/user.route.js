import express from 'express';
import { login, signup, googleAuth } from '../controller/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleAuth);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'You are authenticated!' });
});

// Endpoint to check authentication status
router.get('/check-auth', authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

export default router;
