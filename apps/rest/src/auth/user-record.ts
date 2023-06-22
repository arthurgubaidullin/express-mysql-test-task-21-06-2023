import * as Salt from './salt';
import * as Password from './password';

export interface UserRecord {
  readonly userId: string;
  readonly password: string;
  readonly salt: string;
}

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
