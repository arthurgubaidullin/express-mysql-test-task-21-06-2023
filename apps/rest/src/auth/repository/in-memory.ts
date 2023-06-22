import { left, right } from 'fp-ts/Either';
import { UserRecord } from '../user-record';
import { UserRepository } from './type';

const map = new Map<string, UserRecord>();

export const getInMemoryUserRepository = (): UserRepository => {
  return {
    createUserRecord: (record) => {
      if (map.has(record.userId)) {
        return left(new Error('Found a user with the same id.'));
      }
      map.set(record.userId, record);
      return right(void 0);
    },
  };
};
