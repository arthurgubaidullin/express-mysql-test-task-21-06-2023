import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'node:fs';

describe('GET /file/list', () => {
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

  it('should return list of file record', async () => {
    const res = await axios.get(`/file/list`);

    expect(res.status).toBe(200);
    expect(typeof res.data === 'object').toBeTruthy();
    expect(Array.isArray(res.data?.list)).toBeTruthy();
    expect(typeof res.data?.page === 'number').toBeTruthy();
    expect(typeof res.data?.list_size === 'number').toBeTruthy();
    expect(res.data?.list.length > 0).toBeTruthy();
  });

  it('should return list of file record (page 2)', async () => {
    const res = await axios.get(`/file/list?page=2&list_size=2`);

    expect(res.status).toBe(200);
    expect(typeof res.data === 'object').toBeTruthy();
    expect(Array.isArray(res.data?.list)).toBeTruthy();
    expect(typeof res.data?.page === 'number').toBeTruthy();
    expect(typeof res.data?.list_size === 'number').toBeTruthy();
  });
});
