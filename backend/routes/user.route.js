// user.routes.js
import express from 'express';
import { login, signup, googleAuth } from "../controller/user.controller.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleAuth);



export default router;
