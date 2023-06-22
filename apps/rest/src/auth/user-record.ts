import * as Salt from './salt';
import * as Password from './password';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export interface UserRecord {
  readonly userId: string;
  readonly password: string;
  readonly salt: string;
}

export const UserRecord = t.readonly(
  t.strict({
    userId: NonEmptyString,
    password: NonEmptyString,
    salt: NonEmptyString,
  })
);

export async function create(
  userId: string,
  password: string
): Promise<UserRecord> {
  const salt = Salt.generate();
  const hashedPassword: string = await Password.hash(password, salt);

  return {
    userId,
    password: hashedPassword,
    salt,
  };
}
