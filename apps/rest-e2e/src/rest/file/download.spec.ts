import FormData from 'form-data';
import * as fs from 'node:fs';
import * as Email from '../auth/email';
import { createHttpClient } from './http-client';
import { registerUser } from './register-user';

describe('GET /file/download/:fileId', () => {
  let fileId: string | null = null;
  let id: string | null = null;
  let accessToken: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    ({ accessToken } = await registerUser(id, password));
  });

  beforeEach(async () => {
    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await createHttpClient(accessToken).post(`/file/upload`, form, {
      headers: { ...form.getHeaders() },
    });

    fileId = res.data.fileId;
  });

  afterEach(async () => {
    if (fileId) {
      await createHttpClient(accessToken).delete(`/file/delete/${fileId}`);
    }
  });

  it('should download a file', async () => {
    const res = await createHttpClient(accessToken).get(
      `/file/download/${fileId}`
    );

    expect(res.status).toBe(200);
    expect(res.data.length > 0).toBeTruthy();
  });
});
