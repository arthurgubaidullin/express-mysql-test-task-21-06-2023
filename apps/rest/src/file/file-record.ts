import { randomUUID } from 'crypto';
import { extname } from 'path';
import * as t from 'io-ts';
import { DateFromISOString } from 'io-ts-types';

export const FileRecord = t.readonly(
  t.strict({
    fileId: t.string,
    name: t.string,
    ext: t.string,
    mimeType: t.string,
    size: t.number,
    date: DateFromISOString,
    path: t.string,
  })
);

export interface FileRecord {
  fileId: string;
  name: string;
  ext: string;
  mimeType: string;
  size: number;
  date: Date;
  path: string;
}

export function create(file: Express.Multer.File): FileRecord {
  return {
    fileId: randomUUID(),
    path: file.path,
    name: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    ext: extname(file.originalname),
    date: new Date(),
  };
}

export function change(
  file: Express.Multer.File,
  record: FileRecord
): FileRecord {
  return {
    ...record,
    path: file.path,
    name: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    ext: extname(file.originalname),
    date: new Date(),
  };
}
