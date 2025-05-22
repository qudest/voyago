import axios from "axios";
import { API_URL } from "../variables/ip";

export const getAccountInfo = async (cleanedPhoneNumber, accessToken) => {
  return axios.get(`https://${API_URL}/api/account/${cleanedPhoneNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const sendSecurityCode = async (phoneNumber) => {
  return axios.post(
    `https://voyago-app.ru/api/security/send`,
    {
      phoneNumber,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

export const getAccountTockens = async (phoneNumber, code) => {
  return axios.post(`https://${API_URL}/api/security`, {
    phoneNumber: phoneNumber,
    code: code,
  });
};
