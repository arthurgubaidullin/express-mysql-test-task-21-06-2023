import express from 'express';
import { FileRepository } from '../repository/instance';
import { FileRecord } from '../file-record';
import { isNone } from 'fp-ts/Option';
import { isLeft } from 'fp-ts/Either';
import { TypeWithFileId } from '../type-with-file-id';
import { OutputOf } from 'io-ts';

export async function getFileRecordHandler(
  req: express.Request<unknown>,
  res: express.Response<OutputOf<typeof FileRecord>>
): Promise<void> {
  const params = TypeWithFileId.decode(req.params);

  if (isLeft(params)) {
    res.status(400).end();
    return;
  }

  const record = await FileRepository.getFileRecord(params.right.fileId);

  if (isNone(record)) {
    res.status(404).end();
    return;
  }
  res.json(FileRecord.encode(record.value)).end();
}
