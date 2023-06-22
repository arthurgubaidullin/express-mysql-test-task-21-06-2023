import { UserRecord } from '../user-record';

export interface CreateUserRecord {
  readonly createUserRecord: (record: UserRecord) => void;
}

export type UserRepository = CreateUserRecord;
