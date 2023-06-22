import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const SignInRequest = t.readonly(
  t.strict({
    id: NonEmptyString,
    password: NonEmptyString,
  })
);
