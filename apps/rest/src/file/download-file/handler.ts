import express from 'express';
import * as Option from 'fp-ts/Option';
import { FileRepository } from '../repository/instance';
import { TypeWithFileId } from '../type-with-file-id';
import { isLeft } from 'fp-ts/Either';

export async function downloadFileHandler(
  req: express.Request<unknown>,
  res: express.Response<never>
): Promise<void> {
  const params = TypeWithFileId.decode(req.params);

  if (isLeft(params)) {
    res.status(400).end();
    return;
  }

  const file = await FileRepository.getFileRecord(params.right.fileId);

  if (Option.isNone(file)) {
    res.status(400).end();
    return;
  }

  res.setHeader('content-type', file.value.mimeType);
  res.sendFile(file.value.path);
}
