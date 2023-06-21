import * as Option from 'fp-ts/Option';
import * as FileRecord from '../file-record';
import { FileRepository } from './type';

const records: Map<string, FileRecord.FileRecord> = new Map();

function createFileRecord(record: FileRecord.FileRecord): void {
  if (!records.has(record.fileId)) {
    records.set(record.fileId, record);
  }
}

function updateFileRecord(record: FileRecord.FileRecord): void {
  if (records.has(record.fileId)) {
    records.set(record.fileId, record);
  }
}

function getFileRecord(fileId: string): Option.Option<FileRecord.FileRecord> {
  if (records.has(fileId)) {
    const record = records.get(fileId);
    return Option.some(record);
  }

  return Option.none;
}

export function getFileRecords(): FileRecord.FileRecord[] {
  return Array.from(records.values());
}

export function deleteFileRecord(fileId: string): void {
  records.delete(fileId);
}

export const InMemoryFileRepository: FileRepository = {
  createFileRecord,
  getFileRecord,
  getFileRecords,
  deleteFileRecord,
  updateFileRecord,
};
