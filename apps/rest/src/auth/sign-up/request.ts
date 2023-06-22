import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const SignUpRequest = t.readonly(
  t.strict({
    id: NonEmptyString,
    password: NonEmptyString,
  })
);
