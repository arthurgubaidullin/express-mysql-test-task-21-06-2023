import * as t from 'io-ts';
import { create } from '../../response/response';

export const SignInResponse = create(
  t.readonly(
    t.strict({
      user_id: t.string,
    })
  )
);
