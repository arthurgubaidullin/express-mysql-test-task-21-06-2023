import express from 'express';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { listFileRecord } from './use-case';
import { ListRequest } from './request';
import { ListResponse } from './response';

export async function listFileRecordHandler(
  req: express.Request<unknown>,
  res: express.Response<t.OutputOf<typeof ListResponse>>
): Promise<void> {
  const query = ListRequest.decode(req.query);

  if (isLeft(query)) {
    res.status(400).end();
    return;
  }

  const result = await listFileRecord({
    ...query.right,
    listSize: query.right.list_size,
  });

  res
    .json(
      ListResponse.encode({
        list: result.list,
        list_size: result.listSize,
        page: result.page,
      })
    )
    .end();
}
