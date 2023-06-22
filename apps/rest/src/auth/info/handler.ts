import express from 'express';
import * as t from 'io-ts';
import { onlyAuthorized } from '../only-authorized';
import { SignInResponse } from './response';

export const infoHandler = onlyAuthorized(
  ({ userId }: { userId: string }) =>
    async (
      req: express.Request<unknown>,
      res: express.Response<t.OutputOf<typeof SignInResponse>>
    ): Promise<void> => {
      res
        .status(200)
        .json(
          SignInResponse.encode({
            ok: true,
            result: {
              user_id: userId,
            },
          })
        )
        .end();
    }
);
