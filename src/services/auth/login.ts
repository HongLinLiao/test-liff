import { Axios } from "axios";

export const login = async (
  axios: Axios,
  accessToken: string
): Promise<void> => {
  return await axios
    .request({
      url: `/api/login`,
      method: "POST",
      data: { accessToken: accessToken },
    })
    .then(res => res.data);
};
