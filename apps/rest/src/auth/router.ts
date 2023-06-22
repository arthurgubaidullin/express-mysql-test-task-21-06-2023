import express from 'express';
import { signUpHandler } from './sign-up/handler';
import { signInHandler } from './sign-in/handler';

const auth = express.Router();

auth.post('/signup', signUpHandler);

auth.post('/signin', signInHandler);

export default auth;
