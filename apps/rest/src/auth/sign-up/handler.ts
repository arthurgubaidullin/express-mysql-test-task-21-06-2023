import express from 'express';

export function signUpHandler(
  req: express.Request<unknown>,
  res: express.Response
): void {
  res.status(201).end();
}
