import { getMySQLRepository } from './mysql';
import { UserRepository } from './type';

export const getUserRepository = (): UserRepository => getMySQLRepository();
