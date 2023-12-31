import express from 'express';
import * as FileRecord from '../file-record';
import { FileRepository } from '../repository/instance';
import * as Option from 'fp-ts/Option';
import { rm } from 'fs/promises';
import { isLeft } from 'fp-ts/Either';
import { TypeWithFileId } from '../type-with-file-id';

export async function updateFileHandler(
  req: express.Request<unknown>,
  res: express.Response<never>
): Promise<void> {
  if (!req.file) {
    res.status(500).end();
    return;
  }

  const params = TypeWithFileId.decode(req.params);

  if (isLeft(params)) {
    res.status(400).end();
    return;
  }

  const record = await FileRepository.getFileRecord(params.right.fileId);

  if (Option.isNone(record)) {
    res.status(404).end();
    return;
  }

  const changed = FileRecord.change(req.file, record.value);

  await FileRepository.updateFileRecord(changed);

  await rm(record.value.path);

  res.status(202).end();
}
