import * as O from 'fp-ts/Option';
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

export function verify(token: string): O.Option<JWTPayload> {
  const payload = jwt.verify(token, Secret.get());
  const data = JWTPayload.decode(payload);
  return O.fromEither(data);
}
