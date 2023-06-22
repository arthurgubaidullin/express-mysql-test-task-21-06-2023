import express from 'express';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as t from 'io-ts';
import * as JWT from '../../jwt/jwt';
import { getUserRepository } from '../repository/instance';
import { SignInWithRefreshTokenRequest } from './request';
import { SignInWithRefreshTokenResponse } from './response';
import { blRepository } from '../bl-repository/instance';

export async function signInWithRefreshTokenHandler(
  req: express.Request<unknown>,
  res: express.Response<t.OutputOf<typeof SignInWithRefreshTokenResponse>>
): Promise<void> {
  const _body = SignInWithRefreshTokenRequest.decode(req.body);

  if (E.isLeft(_body)) {
    res.status(400).end();
    return;
  }
  const body = _body.right;

  const _payload = JWT.verify(body.refresh_token);
  if (O.isNone(_payload)) {
    res.status(400).json({ ok: false, reason: 'Invalid refresh token.' }).end();
    return;
  }
  const payload = _payload.value;

  if (await blRepository.isTokenBanned(body.refresh_token)) {
    res.status(400).json({ ok: false, reason: 'Invalid refresh token.' }).end();
    return;
  }

  const repo = getUserRepository();

  const _record = repo.getUserRecord(payload.userId);

  if (O.isNone(_record)) {
    res.status(400).json({ ok: false, reason: 'No user found.' }).end();
    return;
  }
  const record = _record.value;

  await blRepository.banToken(body.refresh_token);

  const accessToken = JWT.sign(record.userId);
  const refreshToken = JWT.sign(record.userId, 'refresh');

  res
    .status(200)
    .json(
      SignInWithRefreshTokenResponse.encode({
        ok: true,
        result: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      })
    )
    .end();
}
