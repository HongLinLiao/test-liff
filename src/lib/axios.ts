import axios from "axios";

export const createAxios = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
};
