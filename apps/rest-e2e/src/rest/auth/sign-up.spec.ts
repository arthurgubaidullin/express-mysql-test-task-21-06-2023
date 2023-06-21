import axios from 'axios';

describe('POST /signup', () => {
  it('should sign up a user', async () => {
    const res = await axios.post(`/signup`, {
      id: 'test@example.com',
      password: 'abcdef12345',
    });

    expect(res.status).toBe(201);
  });
});
