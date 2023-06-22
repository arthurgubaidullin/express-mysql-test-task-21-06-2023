import express from 'express';
import * as O from 'fp-ts/Option';
import { NonEmptyString } from 'io-ts-types';
import * as AccessToken from '../access-token';
import * as JWT from '../jwt/jwt';
import { Mixed, OutputOf } from 'io-ts';
import { blRepository } from './bl-repository/instance';

export const onlyAuthorized =
  <C extends Mixed>(
    f: (
      data: Readonly<{
        userId: string;
        rawToken: string;
      }>
    ) => (
      req: express.Request<unknown>,
      res: express.Response<OutputOf<C>>
    ) => void | Promise<void>
  ) =>
  async (
    req: express.Request<unknown>,
    res: express.Response<OutputOf<C>>
  ): Promise<void> => {
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

    if (await blRepository.isTokenBanned(token)) {
      res.status(401).json({ ok: false, reason: 'Token is banned.' }).end();
      return;
    }

    if (payload.kind !== 'access') {
      res
        .status(401)
        .json({ ok: false, reason: 'Only access tokens can be used.' })
        .end();
      return;
    }

    return f({ userId: payload.userId, rawToken: token })(req, res);
  };

export const onlyAuthorizedMiddleware = (
  req: express.Request<unknown>,
  res: express.Response,
  next: () => void | Promise<void>
) => {
  return onlyAuthorized(() => () => {
    next();
  })(req, res);
};
