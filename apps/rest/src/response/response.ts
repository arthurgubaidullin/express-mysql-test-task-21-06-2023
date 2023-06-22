import * as t from 'io-ts';

export const create = <C extends t.Mixed>(resultCodec: C) =>
  t.readonly(
    t.union([
      t.strict({ ok: t.literal(false), reason: t.string }),
      t.strict({ ok: t.literal(true), result: resultCodec }),
    ])
  );
