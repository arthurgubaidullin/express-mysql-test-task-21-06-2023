import FormData from 'form-data';
import * as fs from 'node:fs';
import * as Email from '../auth/email';
import { createHttpClient } from './http-client';
import { registerUser } from './register-user';

describe('POST /file/upload', () => {
  let fileId: string | null = null;
  let id: string | null = null;
  let accessToken: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    ({ accessToken } = await registerUser(id, password));
  });

  afterEach(async () => {
    if (fileId) {
      await createHttpClient(accessToken).delete(`/file/delete/${fileId}`);
    }
  });

  it('should upload a file and return file id', async () => {
    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await createHttpClient(accessToken).post(`/file/upload`, form, {
      headers: { ...form.getHeaders() },
    });

    expect(res.status).toBe(201);
    expect(res.data?.fileId).toBeDefined();
    expect(typeof res.data?.fileId === 'string').toBeTruthy();

    fileId = res.data?.fileId;
  });
});
