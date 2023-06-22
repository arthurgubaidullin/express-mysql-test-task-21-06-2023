import axios from 'axios';
import * as Email from './email';

describe('POST /signup', () => {
  it('should sign up a user', async () => {
    const res = await axios.post(`/signup`, {
      id: Email.generate(),
      password: 'abcdef12345',
    });

    expect(res.status).toBe(201);
    expect(res.data.result.access_token).toBeTruthy();
  });

  it('should fail to sign up same user twice', async () => {
    const data = {
      id: Email.generate(),
      password: 'abcdef12345',
    };
    await axios.post(`/signup`, data);

    const res = await axios.post(`/signup`, data, {
      validateStatus: () => true,
    });

    expect(res.status).toBe(400);
  });
});
