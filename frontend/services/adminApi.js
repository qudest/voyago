import axios from "axios";
import { API_URL } from "../variables/ip";

export const findAllUsers = async (accessToken) => {
  return axios.get(`https://${API_URL}/api/account`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const deleteUser = async (userId, accessToken) => {
  return axios.delete(`https://${API_URL}/api/account/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
