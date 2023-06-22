import axios from 'axios';
import * as Email from './email';

describe('POST /signin', () => {
  let id: string | null = null;
  let accessToken: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    await axios.post(`/signup`, {
      id,
      password,
    });
    accessToken = (
      await axios.post(`/signin`, {
        id,
        password,
      })
    ).data.result.access_token;
  });

  it('should return info', async () => {
    const res = await axios.get(`/info`, {
      headers: { Authorization: `bearer ${accessToken}` },
      validateStatus: () => true,
    });

    expect(res.status).toBe(200);
    expect(res.data.result.user_id).toBeTruthy();
  });

  it('should not return info', async () => {
    const res = await axios.get(`/info`, { validateStatus: () => true });

    expect(res.status).toBe(401);
  });
});
