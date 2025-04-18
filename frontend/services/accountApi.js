import axios from 'axios';
import { API_URL } from '../variables/ip';

export const putAccountInfo = async (id, country, city, preferences, creditCard, accessToken) => {
  return axios.put(`http://${API_URL}:8091/api/account/${id}`,
    {
        country: country,
        city: "Russia",
        preferences: preferences,
        creditCard: creditCard
      },
      {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }
  );
};

