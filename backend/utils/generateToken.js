import jwt from 'jsonwebtoken';

const generateTokenandSetCookie = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie('jwt', token, {
        maxAge: 1* 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
      });      

}

export default generateTokenandSetCookie;