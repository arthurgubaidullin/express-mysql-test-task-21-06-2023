import express from 'express';
import { getUserRepository } from '../repository/instance';
import * as UserRecord from '../user-record';
import { isLeft } from 'fp-ts/Either';
import { SignUpRequest } from './request';
import { SignUpResponse } from './response';
import { OutputOf } from 'io-ts';
import { sign } from './jwt';

export async function signUpHandler(
  req: express.Request<unknown>,
  res: express.Response<OutputOf<typeof SignUpResponse>>
): Promise<void> {
  const params = SignUpRequest.decode(req.body);

  if (isLeft(params)) {
    res.status(400).end();
    return;
  }

  const repo = getUserRepository();

  const record = await UserRecord.create(
    params.right.id,
    params.right.password
  );

  const accessToken = sign(record.userId);

  const result = repo.createUserRecord(record);

  if (isLeft(result)) {
    res.status(400).json({ ok: false, reason: result.left.message }).end();
    return;
  }

  res
    .status(201)
    .json(
      SignUpResponse.encode({ ok: true, result: { access_token: accessToken } })
    )
    .end();
}
