import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_TOKEN);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401);
      throw new Error('You are not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('You are not authorized');
  }
});

export { protect };
