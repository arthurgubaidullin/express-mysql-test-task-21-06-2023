import axios from 'axios';

export const registerUser = async (
  id: string,
  password: string
): Promise<{
  id: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}> => {
  await axios.post(`/signup`, {
    id,
    password,
  });
  const res = await axios.post(`/signin`, {
    id,
    password,
  });
  const accessToken = res.data.result.access_token;
  const refreshToken = res.data.result.refresh_token;
  return { id, password, accessToken, refreshToken };
};
