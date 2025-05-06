import axios from 'axios';
import { API_URL } from '../variables/ip';

export const getAccountInfo = async (cleanedPhoneNumber, accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/account/${cleanedPhoneNumber}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const sendSecurityCode = async (phoneNumber) => {
  return axios.post(`http://${API_URL}:8090/api/security/send`, { phoneNumber });
};

export const getAccountTockens = async (phoneNumber, code) => {
    return axios.post(`http://${API_URL}:8090/api/security`, 
    {
      "phoneNumber": phoneNumber,
      "code": code
    }
  );
}
