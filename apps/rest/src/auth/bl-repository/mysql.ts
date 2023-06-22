import { PrismaClient } from '@prisma/client';
import { BLRepository } from './type';

const prisma = new PrismaClient();

export const mysqlRepository = (): BLRepository => {
  return {
    banToken: async (t) => {
      try {
        await prisma.blackListRecord.create({ data: { token: t } });
      } catch (e) {
        console.error(e);
      }
    },
    isTokenBanned: async (t) => {
      const r = await prisma.blackListRecord.findFirst({ where: { token: t } });
      return r !== null;
    },
  };
};
