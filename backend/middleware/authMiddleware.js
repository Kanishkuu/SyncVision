import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ msg: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'Invalid token' });

    req.userId = decoded.id; // Set the user ID in the request object
    next();
  });
};

export default authMiddleware;
