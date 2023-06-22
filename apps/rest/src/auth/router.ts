import express from 'express';
import { signUpHandler } from './sign-up/handler';
import { signInHandler } from './sign-in/handler';
import { infoHandler } from './info/handler';
import { signInWithRefreshTokenHandler } from './sign-in-with-refresh-token/handler';

const auth = express.Router();

auth.post('/signup', signUpHandler);

auth.post('/signin', signInHandler);

auth.post('/signin/new_token', signInWithRefreshTokenHandler);

auth.get('/info', infoHandler);

export default auth;
