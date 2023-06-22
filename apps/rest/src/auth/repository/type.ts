import { Either } from 'fp-ts/Either';
import { UserRecord } from '../user-record';
import { Option } from 'fp-ts/Option';

export interface CreateUserRecord {
  readonly createUserRecord: (
    record: UserRecord
  ) => Promise<Either<Error, void>>;
}

export interface GetUserRecord {
  readonly getUserRecord: (userId: string) => Promise<Option<UserRecord>>;
}

export type UserRepository = CreateUserRecord & GetUserRecord;
