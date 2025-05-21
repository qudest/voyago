import axios from "axios";
import { API_URL } from "../variables/ip";

export const getPremium = async (phoneNumber, accessToken) => {
  return axios.post(
    `http://${API_URL}:8090/api/subscription`,
    {
      phoneNumber: phoneNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const findPremiumUser = async (phoneNumber, accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/account/${phoneNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
