import * as t from 'io-ts';

export const SignUpResponse = t.readonly(
  t.strict({
    access_token: t.string,
  })
);
