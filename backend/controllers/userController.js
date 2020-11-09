import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.status(200).send(email, password);
});
