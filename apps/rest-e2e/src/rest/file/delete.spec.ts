import FormData from 'form-data';
import * as fs from 'node:fs';
import * as Email from '../auth/email';
import { createHttpClient } from './http-client';
import { registerUser } from './register-user';

describe('DELETE /file/:fileId', () => {
  let fileId: string | null = null;
  let id: string | null = null;
  let accessToken: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    ({ accessToken } = await registerUser(id, password));

    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await createHttpClient(accessToken).post(`/file/upload`, form, {
      headers: { ...form.getHeaders() },
    });

    fileId = res.data.fileId;
  });

  it('should delete a file', async () => {
    const res2 = await createHttpClient(accessToken).delete(
      `/file/delete/${fileId}`
    );

    expect(res2.status).toBe(202);
  });
});
