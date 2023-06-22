import * as t from 'io-ts';

export type JWTPayload = t.TypeOf<typeof JWTPayload>;

export const JWTPayload = t.readonly(
  t.strict({
    userId: t.string,
    kind: t.keyof({ access: null, refresh: null }),
  })
);
