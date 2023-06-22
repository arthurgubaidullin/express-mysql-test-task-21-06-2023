import express from 'express';
import { onlyAuthorized } from '../only-authorized';
import { blRepository } from '../bl-repository/instance';

export const signOutHandler = onlyAuthorized(
  (data: Readonly<{ rawToken: string }>) =>
    async (
      req: express.Request<unknown>,
      res: express.Response
    ): Promise<void> => {
      await blRepository.banToken(data.rawToken);

      res.status(202).end();
    }
);
