import express from 'express';
import { FileRepository } from '../repository/instance';
import fs from 'node:fs/promises';
import * as Option from 'fp-ts/Option';
import { TypeWithFileId } from '../type-with-file-id';
import { isLeft } from 'fp-ts/Either';

export async function deleteFileRecordHandler(
  req: express.Request<unknown>,
  res: express.Response<never>
): Promise<void> {
  const params = TypeWithFileId.decode(req.params);

  if (isLeft(params)) {
    res.status(400).end();
    return;
  }

  const file = FileRepository.getFileRecord(params.right.fileId);

  if (Option.isNone(file)) {
    res.status(400).end();
    return;
  }

  await fs.rm(file.value.path);
  FileRepository.deleteFileRecord(file.value.fileId);
  res.status(202).end();
}
