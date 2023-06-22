import axios from 'axios';
import * as Email from './email';

describe('POST /signin/new_token', () => {
  let id: string | null = null;
  const password = 'abcdef12345';
  let refreshToken: string | null = null;

  beforeEach(async () => {
    id = Email.generate();
    refreshToken = (
      await axios.post(`/signup`, {
        id,
        password,
      })
    ).data.result.refresh_token;
  });

  it('should sign in', async () => {
    const res = await axios.post(
      `/signin/new_token`,
      {
        refresh_token: refreshToken,
      },
      { validateStatus: () => true }
    );

    expect(res.status).toBe(200);
    expect(res.data.result.access_token).toBeTruthy();
    expect(res.data.result.refresh_token).toBeTruthy();
  });
});
