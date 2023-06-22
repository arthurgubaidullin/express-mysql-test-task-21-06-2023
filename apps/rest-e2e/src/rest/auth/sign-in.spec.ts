import axios from 'axios';
import * as Email from './email';

describe('POST /signin', () => {
  let id: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    await axios.post(`/signup`, {
      id,
      password,
    });
  });

  it('should sign in', async () => {
    const res = await axios.post(`/signin`, {
      id,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.data.result.access_token).toBeTruthy();
    expect(res.data.result.refresh_token).toBeTruthy();
  });

  it('should not sign in', async () => {
    const data = {
      id,
      password: 'test',
    };
    const res = await axios.post(`/signin`, data, {
      validateStatus: () => true,
    });

    expect(res.status).toBe(400);
  });
});
