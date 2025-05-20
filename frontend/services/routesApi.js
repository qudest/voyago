import axios from "axios";
import { API_URL } from "../variables/ip";

export const findAll = async (accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/routes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const RouteCreate = async (
  name,
  createdBy,
  tags,
  routePoints,
  distance,
  duration,
  accessToken
) => {
  return axios.post(
    `http://${API_URL}:8090/api/routes`,
    {
      name: name,
      createdBy: createdBy,
      tags: tags,
      routePoints: {
        origin: routePoints.origin,
        waypoints: routePoints.waypoints,
        destination: routePoints.destination,
      },
      distance: distance,
      duration: duration,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};

export const RouteUpdate = async (
  id,
  name,
  createdBy,
  tags,
  routePoints,
  distance,
  duration,
  accessToken
) => {
  return axios.put(
    `http://${API_URL}:8090/api/routes/${id}`,
    {
      name: name,
      createdBy: createdBy,
      tags: tags,
      routePoints: {
        origin: routePoints.origin,
        waypoints: routePoints.waypoints,
        destination: routePoints.destination,
      },
      distance: distance,
      duration: duration,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};

export const RouteReadDto = async (id, accessToken) => {
  return axios.get(`http://${API_URL}:8090/api/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const RouteDelete = async (id, accessToken) => {
  return axios.delete(`http://${API_URL}:8090/api/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const findAllFavorites = async (userId, accessToken) => {
  return axios.get(
    `http://${API_URL}:8090/api/routes/favorites?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};

export const addToFavorites = async (routeId, userId, accessToken) => {
  return axios.put(
    `http://${API_URL}:8090/api/routes/favorites`,
    { routeId, userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};
export const deleteFavorites = async (routeId, userId, accessToken) => {
  return axios.delete(`http://${API_URL}:8090/api/routes/favorites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      routeId: routeId,
      userId: userId,
    },
  });
};

export const findRoutesByUser = async (userId, accessToken) => {
  return axios.get(
    `http://${API_URL}:8090/api/routes/passed?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};

export const addRoutesByUser = async (routeId, userId, accessToken) => {
  return axios.put(
    `http://${API_URL}:8090/api/routes/passed`,
    { routeId, userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, application/yaml",
      },
    }
  );
};
