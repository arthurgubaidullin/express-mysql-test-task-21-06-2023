import express from 'express';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as t from 'io-ts';
import * as JWT from '../../jwt/jwt';
import { getUserRepository } from '../repository/instance';
import { SignInRequest } from './request';
import { SignInResponse } from './response';

export async function signInHandler(
  req: express.Request<unknown>,
  res: express.Response<t.OutputOf<typeof SignInResponse>>
): Promise<void> {
  const _params = SignInRequest.decode(req.body);

  if (E.isLeft(_params)) {
    res.status(400).end();
    return;
  }
  const params = _params.right;

  const repo = getUserRepository();

  const _record = repo.getUserRecord(params.id);

  if (O.isNone(_record)) {
    res.status(400).json({ ok: false, reason: 'No user found.' }).end();

    return;
  }
  const record = _record.value;

  const accessToken = JWT.sign(record.userId);
  const refreshToken = JWT.sign(record.userId, 'refresh');

  res
    .status(200)
    .json(
      SignInResponse.encode({
        ok: true,
        result: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      })
    )
    .end();
}
