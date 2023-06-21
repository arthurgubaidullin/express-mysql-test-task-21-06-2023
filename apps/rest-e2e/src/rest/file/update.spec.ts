import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'node:fs';

describe('PUT /file/update/:fileId', () => {
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

  it('should update a file', async () => {
    const file = fs.createReadStream(__filename);

    const form = new FormData();
    form.append('file', file, __filename);

    const res = await axios.put(`/file/update/${fileId}`, form, {
      headers: { ...form.getHeaders() },
    });

    expect(res.status).toBe(202);
  });
});
