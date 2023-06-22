import { getInMemoryUserRepository } from './in-memory';
import { UserRepository } from './type';

export const getUserRepository = (): UserRepository =>
  getInMemoryUserRepository();
