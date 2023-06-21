import * as t from 'io-ts';
import { NumberFromString, withFallback } from 'io-ts-types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIST_SIZE = 1;

export const ListRequest = t.readonly(
  t.strict({
    page: withFallback(NumberFromString, DEFAULT_PAGE),
    list_size: withFallback(NumberFromString, DEFAULT_LIST_SIZE),
  })
);
