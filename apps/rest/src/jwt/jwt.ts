import jwt from 'jsonwebtoken';
import * as Secret from '../secret';
import { JWTPayload } from './jwt-payload';

export function sign(userId: string, kind: 'access' | 'refresh' = 'access') {
  const payload = JWTPayload.encode({
    userId,
    kind,
  });
  return jwt.sign(payload, Secret.get(), {
    expiresIn: kind === 'access' ? '10m' : '1m',
  });
}
