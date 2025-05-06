import axios from 'axios';
import { API_URL } from '../variables/ip';

export const postRating = async (routeId, rating, accessToken) => {
    return axios.post(`http://${API_URL}:8090/api/ratings`,
      {   
            routeId: routeId,
            rating: rating
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
      }
    );
  };
  