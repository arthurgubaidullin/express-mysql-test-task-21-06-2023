import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

export const TypeWithFileId = t.readonly(
  t.strict({
    fileId: NonEmptyString,
  })
);
