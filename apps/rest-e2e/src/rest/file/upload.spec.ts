import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'node:fs';

describe('POST /file/upload', () => {
  let fileId: string | null = null;

  afterEach(async () => {
    if (fileId) {
      await axios.delete(`/file/delete/${fileId}`);
    }
  });

  it('should upload a file and return file id', async () => {
    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await axios.post(`/file/upload`, form, {
      headers: { ...form.getHeaders() },
    });

    expect(res.status).toBe(201);
    expect(res.data?.fileId).toBeDefined();
    expect(typeof res.data?.fileId === 'string').toBeTruthy();

    fileId = res.data?.fileId;
  });
});
