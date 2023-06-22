import { BLRepository } from './type';

const map = new Map<string, boolean>();

export const inMemoryRepository: BLRepository = {
  banToken: async (token) => {
    if (!map.has(token)) {
      map.set(token, true);
    }
  },
  isTokenBanned: async (token) => {
    return map.has(token);
  },
};
