import { NonEmptyString } from 'io-ts-types';

export function fromBearerToken(authorization: NonEmptyString) {
  return authorization.slice('bearer '.length);
}
