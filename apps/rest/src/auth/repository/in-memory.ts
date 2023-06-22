import { UserRecord } from '../user-record';
import { UserRepository } from './type';

const map = new Map<string, UserRecord>();

export const getInMemoryUserRepository = (): UserRepository => {
  return {
    createUserRecord: (record) => {
      if (!map.has(record.userId)) {
        map.set(record.userId, record);
      }
    },
  };
};
