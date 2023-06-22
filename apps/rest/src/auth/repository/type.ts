import { Either } from 'fp-ts/Either';
import { UserRecord } from '../user-record';

export interface CreateUserRecord {
  readonly createUserRecord: (record: UserRecord) => Either<Error, void>;
}

export type UserRepository = CreateUserRecord;
