    import bcrypt from 'bcryptjs';
    import { OAuth2Client } from 'google-auth-library';
    import User from '../model/user.model.js';
    import generateTokenAndSetCookie from '../utils/generateToken.js'; 

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    export const login = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email) {
                return res.status(400).json({ msg: 'Email is required' });
            }
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            generateTokenAndSetCookie(user._id, res);

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            });
        } catch (error) {
            res.status(500).json({ msg: 'Server Error' });
        }
    };

    export const signup = async (req, res) => {
        const { username, email, password, gender } = req.body;
        try {

            if (!username || !email || !password || !gender) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            if (gender !== 'male' && gender !== 'female') {
                return res.status(400).json({ msg: 'Invalid gender' });
            }

            let user = await User.findOne({ $or: [{ username }, { email }] });
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

            user = await User.create({ 
                username, 
                email,
                password: await bcrypt.hash(password, 10),
                gender: gender || 'male', 
                profilePic: (gender || 'male') === "male" ? boyProfilePic : girlProfilePic,
            });

            generateTokenAndSetCookie(user._id, res);

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            });
        } catch (error) {
            res.status(500).json({ msg: 'Server Error' });
        }
    };

    export const logout = async (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "Logged out successfully" });
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
                generateTokenAndSetCookie(user._id, res);

                return res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, profilePic: user.profilePic } });
            } else {
                const defaultGender = 'male'; 
                const profilePic = `https://avatar.iran.liara.run/public/${defaultGender}?username=${name}`;

                user = await User.create({ 
                    googleId: sub, 
                    username: name, 
                    email,
                    gender: defaultGender,
                    profilePic 
                });

                generateTokenAndSetCookie(user._id, res);

                return res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, profilePic: user.profilePic } });
            }
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    };
