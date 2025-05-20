import axios from "axios";
import { API_URL } from "../variables/ip";

export const findAllUsers = async (accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/account`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const deleteUser = async (userId, accessToken) => {
  return axios.delete(`http://${API_URL}:8090/api/account/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
