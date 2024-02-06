import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
  try {
    const jwtToken = req.header('token');
    if (!jwtToken) {
      return res.status(401).json('Not Authorized');
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json('Not Authorized');
  }
};