import { MySQLFileRepository } from './mysql';
import { FileRepository as _FileRepository } from './type';

export const FileRepository: _FileRepository = MySQLFileRepository;
