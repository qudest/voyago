import axios from 'axios';
import { API_URL } from '../variables/ip';

export const putAccountInfo = async (id, userName = null, userCountry = "Russia", selectedCity, selectedPreferences = null, creditCard = null, accessToken) => {
  return axios.put(`http://${API_URL}:8091/api/account/${id}`,
    {   
        name: userName,
        country: userCountry,
        city: selectedCity,
        preferences: selectedPreferences,
        creditCard: creditCard
      },
  );
};

export const putAccountCityAndName = async (id, cityToSend, nameToSend, preferences) => {
  return axios.put(`http://${API_URL}:8091/api/account/${id}`,
    {
      city: cityToSend,
      name: nameToSend,
      preferences: preferences
    },
  );
};

export const deleteAccount = async (id) => {
  return axios.delete(`http://${API_URL}:8091/api/account/${id}`);
};
