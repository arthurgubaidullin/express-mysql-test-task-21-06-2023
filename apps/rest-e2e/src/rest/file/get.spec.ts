import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'node:fs';

describe('GET /file/:fileId', () => {
  let fileId: string | null = null;

  beforeEach(async () => {
    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await axios.post(`/file/upload`, form, {
      headers: { ...form.getHeaders() },
    });

    fileId = res.data.fileId;
  });

  afterEach(async () => {
    if (fileId) {
      await axios.delete(`/file/delete/${fileId}`);
    }
  });

  it('should return file record', async () => {
    const res = await axios.get(`/file/${fileId}`);

    expect(res.status).toBe(200);
    expect(typeof res.data === 'object').toBeTruthy();
  });
});
