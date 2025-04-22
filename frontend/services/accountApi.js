import axios from 'axios';
import { API_URL } from '../variables/ip';

export const putAccountInfo = async (id, selectedCity, preferences = null, creditCard = null, accessToken) => {
  return axios.put(`http://${API_URL}:8091/api/account/${id}`,
    {
        country: "Russia",
        city: selectedCity,
        preferences: preferences,
        creditCard: creditCard
      },
  );
};

