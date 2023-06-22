import { mysqlRepository } from './mysql';
import { BLRepository } from './type';

export const blRepository: BLRepository = mysqlRepository();
