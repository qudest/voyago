import axios from "axios";
import { API_URL } from "../variables/ip";

export const putAccountInfo = async (
  id,
  userName = null,
  userCountry = "Russia",
  selectedCity,
  selectedPreferences = [],
  creditCard = null,
  accessToken
) => {
  console.log(
    id,
    userName,
    userCountry,
    selectedCity,
    accessToken,
    selectedPreferences,
    creditCard
  );
  return axios.put(
    `https://${API_URL}/api/account/${id}`,
    {
      name: userName,
      country: userCountry,
      city: selectedCity,
      preferences: selectedPreferences,
      creditCard: creditCard,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const putAccountCityAndName = async (
  id,
  cityToSend,
  nameToSend,
  preferences,
  accessToken
) => {
  return axios.put(
    `https://${API_URL}/api/account/${id}`,
    {
      city: cityToSend,
      name: nameToSend,
      preferences: preferences,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const deleteAccount = async (id, accessToken) => {
  return axios.delete(`https://${API_URL}/api/account/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
