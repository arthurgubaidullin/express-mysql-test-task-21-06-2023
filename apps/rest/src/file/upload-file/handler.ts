import express from 'express';
import * as FileRecord from '../file-record';
import { FileRepository } from '../repository/instance';
import { OutputOf } from 'io-ts';

export function uploadFileHandler(
  req: express.Request<unknown>,
  res: express.Response<OutputOf<typeof FileRecord.FileRecord>>
): void {
  const record = FileRecord.create(req.file);

  FileRepository.createFileRecord(record);

  res.status(201).json(FileRecord.FileRecord.encode(record)).end();
}
