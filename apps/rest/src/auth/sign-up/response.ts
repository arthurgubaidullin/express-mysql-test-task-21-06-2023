import * as t from 'io-ts';
import { create } from '../../response/response';

export const SignUpResponse = create(
  t.readonly(
    t.strict({
      access_token: t.string,
    })
  )
);
