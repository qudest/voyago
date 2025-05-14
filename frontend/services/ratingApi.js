import axios from 'axios';
import { API_URL } from '../variables/ip';

export const postRating = async (routeId, rating, userId, accessToken) => {
    return axios.post(`http://${API_URL}:8090/api/ratings`,
      {
        routeId: routeId, 
        rating: Number(rating) 
      },
      { 
        params: {
          userId: Number(userId) 
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
};
  

export const patchRating = async (accessToken) => { //валидация и перерасчет рейтинга
    return axios.post(`http://${API_URL}:8090/api/ratings`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
      }
    );
  };

export const getRating = async (routeId, accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/ratings/${routeId}`,
      {
        headers: {
            'Authorization': `Bearer ${accessToken}`
          }
      }
    );
};