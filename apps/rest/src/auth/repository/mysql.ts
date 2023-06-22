import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { UserRepository } from './type';
import { UserRecord } from '../user-record';

export const getMySQLRepository = (): UserRepository => {
  const prisma = new PrismaClient();
  return {
    createUserRecord: async (record) => {
      const count = await prisma.users.count({
        where: { userId: record.userId },
      });

      if (count !== 0) {
        return E.left(new Error('Found a user with the same id.'));
      }

      await prisma.users.create({
        data: {
          userId: record.userId,
          password: record.password,
          salt: record.salt,
        },
      });

      return E.right(void 0);
    },
    getUserRecord: async (userId) => {
      const _user = await prisma.users.findFirst({
        where: { userId: userId },
      });

      if (_user === null) {
        return O.none;
      }

      const user = O.fromEither(UserRecord.decode(_user));

      return user;
    },
  };
};
