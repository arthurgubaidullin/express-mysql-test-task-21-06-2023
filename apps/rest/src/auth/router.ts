import express from 'express';
import { signUpHandler } from './sign-up/handler';

const auth = express.Router();

auth.post('/signup', signUpHandler);

export default auth;
