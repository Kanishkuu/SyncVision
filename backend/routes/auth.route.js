import express from 'express';
import { login, signup, googleAuth, logout } from '../controller/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleAuth);
router.post('/logout',logout)


// Endpoint to check authentication status
router.get('/check-auth', protectRoute, (req, res) => {
  res.json({ authenticated: true });
});

export default router;
