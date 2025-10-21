import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/authControllers.js';

const router = Router();

//Sign up
router.post('/signup', signUp);

//Sign in
router.post('/signin', signIn);

//Sign out
router.post('/signout', signOut);

export default router;
