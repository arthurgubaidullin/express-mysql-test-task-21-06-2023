import jwt from 'jsonwebtoken';
import * as Secret from './secret';

export function sign(userId: string) {
  return jwt.sign({ userId }, Secret.get(), {
    expiresIn: '10m',
  });
}
