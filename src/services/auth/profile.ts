import { Axios } from "axios";

import { User } from "@/types/user";

interface ProfileResponse {
  isLoggedIn: boolean;
  user?: User;
}

export const getCurrentUserProfile = async (
  axios: Axios
): Promise<ProfileResponse> => {
  return await axios
    .request<ProfileResponse>({
      url: `/api/user/me`,
      method: "GET",
    })
    .then(res => res.data);
};
