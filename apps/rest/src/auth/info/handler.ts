import express from 'express';
import * as O from 'fp-ts/Option';
import * as t from 'io-ts';
import * as JWT from '../../jwt/jwt';
import { SignInResponse } from './response';
import { NonEmptyString } from 'io-ts-types';
import * as AccessToken from '../../access-token';

export async function infoHandler(
  req: express.Request<unknown>,
  res: express.Response<t.OutputOf<typeof SignInResponse>>
): Promise<void> {
  const authorization = req.header('Authorization');

  if (!NonEmptyString.is(authorization)) {
    res
      .status(401)
      .json({
        ok: false,
        reason: 'The authorization header could not be found.',
      })
      .end();
    return;
  }
  const token = AccessToken.fromBearerToken(authorization);

  const _payload = JWT.verify(token);

  if (O.isNone(_payload)) {
    res
      .status(401)
      .json({ ok: false, reason: 'The access token is invalid.' })
      .end();
    return;
  }
  const payload = _payload.value;

  res
    .status(200)
    .json(
      SignInResponse.encode({
        ok: true,
        result: {
          user_id: payload.userId,
        },
      })
    )
    .end();
}
