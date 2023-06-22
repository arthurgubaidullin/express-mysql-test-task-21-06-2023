import * as Option from 'fp-ts/Option';
import * as FileRecord from '../file-record';
import { FileRepository } from './type';

const records: Map<string, FileRecord.FileRecord> = new Map();

async function createFileRecord(record: FileRecord.FileRecord): Promise<void> {
  if (!records.has(record.fileId)) {
    records.set(record.fileId, record);
  }
}

async function updateFileRecord(record: FileRecord.FileRecord): Promise<void> {
  if (records.has(record.fileId)) {
    records.set(record.fileId, record);
  }
}

async function getFileRecord(
  fileId: string
): Promise<Option.Option<FileRecord.FileRecord>> {
  if (records.has(fileId)) {
    const record = records.get(fileId);
    if (record) {
      return Option.some(record);
    }
  }

  return Option.none;
}

export async function getFileRecords(): Promise<FileRecord.FileRecord[]> {
  return Array.from(records.values());
}

export async function deleteFileRecord(fileId: string): Promise<void> {
  records.delete(fileId);
}

export const InMemoryFileRepository: FileRepository = {
  createFileRecord,
  getFileRecord,
  getFileRecords,
  deleteFileRecord,
  updateFileRecord,
};
