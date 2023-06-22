import * as t from 'io-ts';
import { create } from '../../response/response';

export const SignInWithRefreshTokenResponse = create(
  t.readonly(
    t.strict({
      access_token: t.string,
      refresh_token: t.string,
    })
  )
);
