import { InMemoryFileRepository } from './in-memory';
import { FileRepository as _FileRepository } from './type';

export const FileRepository: _FileRepository = InMemoryFileRepository;
