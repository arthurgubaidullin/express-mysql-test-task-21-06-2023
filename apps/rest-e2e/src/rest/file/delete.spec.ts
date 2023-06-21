import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'node:fs';

describe('DELETE /file/:fileId', () => {
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

  it('should delete a file', async () => {
    const res2 = await axios.delete(`/file/delete/${fileId}`);

    expect(res2.status).toBe(202);
  });
});
