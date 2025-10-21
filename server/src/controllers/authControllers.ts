import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { User } from '../models/user';
import type { IUser } from '../models/user';

const signUp = async (
  req: Request<unknown, unknown, IUser, unknown>,
  res: Response
) => {
  const { userName, password } = req.body;
  const existingUser: IUser | null = await User.findOne({ userName });
  if (existingUser)
    return res.status(400).json({ success: false, message: 'User exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = await User.create({
    userName,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: newUser,
  });
};

const signIn = async (
  req: Request<unknown, unknown, IUser, unknown>,
  res: Response
) => {
  const { userName, password } = req.body;
  const existingUser: IUser | null = await User.findOne({ userName });
  if (!existingUser) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Credentials' });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  req.session.userId = String(existingUser._id);

  res.status(200).json({
    success: true,
    message: 'Signed in successfully',
  });
};

const signOut = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ success: false, message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
};

export { signUp, signIn, signOut };
