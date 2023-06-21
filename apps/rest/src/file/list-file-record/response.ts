import * as t from 'io-ts';
import { FileRecord } from '../file-record';

export const ListResponse = t.readonly(
  t.strict({
    list: t.readonlyArray(FileRecord),
    page: t.number,
    list_size: t.number,
  })
);
