import * as t from 'io-ts';

export const JWTPayload = t.readonly(
  t.strict({
    userId: t.string,
    kind: t.keyof({ access: null, refresh: null }),
  })
);
