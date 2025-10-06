import { Axios } from "axios";

export const logout = async (axios: Axios): Promise<void> => {
  return await axios.request({
    url: `/api/logout`,
    method: "POST",
  });
};
