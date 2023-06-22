import * as Option from 'fp-ts/Option';
import * as FileRecord from '../file-record';
import { FileRepository } from './type';
import { PrismaClient } from '@prisma/client';
import { compact } from 'fp-ts/Array';

const prisma = new PrismaClient();

async function createFileRecord(record: FileRecord.FileRecord): Promise<void> {
  try {
    await prisma.files.create({ data: FileRecord.FileRecord.encode(record) });
  } catch (error) {
    console.error(error);
  }
}

async function updateFileRecord(record: FileRecord.FileRecord): Promise<void> {
  try {
    await prisma.files.update({
      data: FileRecord.FileRecord.encode(record),
      where: { fileId: record.fileId },
    });
  } catch (error) {
    console.error(error);
  }
}

async function getFileRecord(
  fileId: string
): Promise<Option.Option<FileRecord.FileRecord>> {
  const r = await prisma.files.findFirst({
    where: { fileId: fileId },
  });

  if (r === null) {
    return Option.none;
  }

  return Option.fromEither(FileRecord.FileRecord.decode(r));
}

async function getFileRecords(): Promise<FileRecord.FileRecord[]> {
  const r = await prisma.files.findMany();

  return compact(
    r.map((a) => {
      return Option.fromEither(FileRecord.FileRecord.decode(a));
    })
  );
}

async function deleteFileRecord(fileId: string): Promise<void> {
  await prisma.files.delete({
    where: { fileId: fileId },
  });
}

export const MySQLFileRepository: FileRepository = {
  createFileRecord,
  getFileRecord,
  getFileRecords,
  deleteFileRecord,
  updateFileRecord,
};
