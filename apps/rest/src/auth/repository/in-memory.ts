import * as E from 'fp-ts/Either';
import { UserRecord } from '../user-record';
import { UserRepository } from './type';
import * as O from 'fp-ts/Option';

const map = new Map<string, UserRecord>();

export const getInMemoryUserRepository = (): UserRepository => {
  return {
    createUserRecord: (record) => {
      if (map.has(record.userId)) {
        return E.left(new Error('Found a user with the same id.'));
      }
      map.set(record.userId, record);
      return E.right(void 0);
    },
    getUserRecord: (userId) => {
      if (map.has(userId)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return O.some(map.get(userId)!);
      }

      return O.none;
    },
  };
};
