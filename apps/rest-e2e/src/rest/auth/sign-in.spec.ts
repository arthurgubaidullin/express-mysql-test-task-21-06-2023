import axios from 'axios';
import * as Email from './email';

describe('POST /signin', () => {
  const id = Email.generate();
  const password = 'abcdef12345';

  beforeEach(async () => {
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
});
