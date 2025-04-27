import axios from 'axios';
import { API_URL } from '../variables/ip';

export const RouteCreate = async (name, createdBy, tags, routePoints, distance, duration) => {
    return axios.post('http://${API_URL}:8090/api/routes',
      {   
          name: name,
          createdBy: createdBy,
          tags: tags,
          routePoints: {
            origin: routePoints.origin,
            waypoints: routePoints.waypoints,
            destination: routePoints.destination
          },
          distance: distance,
          duration: duration
        }
    );
  };
  
export const RouteUpdate = async (id, name, createdBy, tags, routePoints, distance, duration) => {
    return axios.put(`http://${API_URL}:8090/api/routes/${id}`,
      {   
          name: name,
          createdBy: createdBy,
          tags: tags,
          routePoints: {
            origin: routePoints.origin,
            waypoints: routePoints.waypoints,
            destination: routePoints.destination
          },
          distance: distance,
          duration: duration
        }
    );
  };

export const RouteReadDto = async (id) => {
    return axios.get(`http://${API_URL}:8090/api/routes/${id}`);
  };

  export const RouteDelete = async (id) => {
    return axios.delete(`http://${API_URL}:8090/api/routes/${id}`);
  };


export const RouteGetFavourite = async (routeId, userId) => {
    return axios.get(`http://${API_URL}:8090/api/routes/favorites`,
         {routeId, userId}
    );
  };

  export const RoutePutFavourite = async () => {
    return axios.put(`http://${API_URL}:8090/api/routes/favorites`)
  };