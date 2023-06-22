import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const SignInWithRefreshTokenRequest = t.readonly(
  t.strict({
    refresh_token: NonEmptyString,
  })
);
