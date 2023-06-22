import axios, { CreateAxiosDefaults } from 'axios';

export function createHttpClient(accessToken: string | null) {
  const config: CreateAxiosDefaults = accessToken
    ? {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
        validateStatus: () => true,
      }
    : {};
  return axios.create(config);
}
