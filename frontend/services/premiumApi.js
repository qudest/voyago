import axios from "axios";
import { API_URL } from "../variables/ip";

export const getPremium = async (phoneNumber, accessToken) => {
  return axios.post(
    `https://${API_URL}/api/subscription`,
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
  return axios.get(`https://${API_URL}/api/account/${phoneNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const aiRoute = async (phoneNumber, country, city, accessToken) => {
  return axios.post(
    `https://${API_URL}/api/ai`,
    {
      phone: phoneNumber,
      country: country,
      city: city,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
