import jwt from 'jsonwebtoken';
import * as Secret from './secret';
import * as t from 'io-ts';

const JWTPayload = t.readonly(
  t.strict({
    userId: t.string,
    kind: t.keyof({ access: null, refresh: null }),
  })
);

export function sign(userId: string, kind: 'access' | 'refresh' = 'access') {
  const payload = JWTPayload.encode({
    userId,
    kind,
  });
  return jwt.sign(payload, Secret.get(), {
    expiresIn: kind === 'access' ? '10m' : '1m',
  });
}
