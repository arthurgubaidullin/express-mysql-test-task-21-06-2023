import { createHttpClient } from '../file/http-client';
import { registerUser } from '../file/register-user';
import * as Email from './email';

describe('POST /logout', () => {
  let id: string | null = null;
  let accessToken: string | null = null;
  const password = 'abcdef12345';

  beforeEach(async () => {
    id = Email.generate();
    ({ accessToken } = await registerUser(id, password));
  });

  it('should have a user logout', async () => {
    const res = await createHttpClient(accessToken).post(`/logout`);
    expect(res.status).toBe(202);
  });

  it('should return unauthorized error', async () => {
    const res = await createHttpClient(null).post(`/logout`, null, {
      validateStatus: () => true,
    });
    expect(res.status).toBe(401);
  });
});
