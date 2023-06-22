import express from 'express';
import * as FileRecord from '../file-record';
import { FileRepository } from '../repository/instance';
import { OutputOf } from 'io-ts';

export async function uploadFileHandler(
  req: express.Request<unknown>,
  res: express.Response<OutputOf<typeof FileRecord.FileRecord>>
): Promise<void> {
  if (!req.file) {
    res.status(500).end();
    return;
  }

  const record = FileRecord.create(req.file);

  await FileRepository.createFileRecord(record);

  res.status(201).json(FileRecord.FileRecord.encode(record)).end();
}
