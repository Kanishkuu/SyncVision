// user.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../model/user.model.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: 3600 });

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if ([email, username, password].some(field => field.trim() === "")) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = await User.create({ username, email, password: await bcrypt.hash(password, 10) });
        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const googleAuth = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, sub } = ticket.getPayload();
        let user = await User.findOne({ googleId: sub });

        if (user) {
            const token = generateToken(user.id);
            return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
        } else {
            user = await User.create({ googleId: sub, username: name, email });
            const token = generateToken(user.id);
            return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
