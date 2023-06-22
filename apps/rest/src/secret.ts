import { NonEmptyString } from 'io-ts-types';

export function get(): NonEmptyString {
  const secret = process.env['SECRET'];

  if (secret === undefined || !NonEmptyString.is(secret)) {
    throw new Error('No value found in SECRET environment variable.');
  }

  return secret;
}
