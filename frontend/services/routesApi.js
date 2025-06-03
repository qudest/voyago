import axios from "axios";
import { API_URL } from "../variables/ip";
import qs from "qs";

export const findAll = async (accessToken, params = {}) => {
  try {
    const updatedParams = {
      page: 0,
      size: 500,
      ...params,
    };

    const queryString = Object.entries(updatedParams)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");

    console.log(queryString);
    return axios.get(
      `https://${API_URL}/api/routes${queryString ? `?${queryString}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log("Error fetching routes:", error);
  }
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
    `https://${API_URL}/api/routes`,
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
    `https://${API_URL}/api/routes/${id}`,
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
  return axios.get(`https://${API_URL}/api/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const RouteDelete = async (id, accessToken) => {
  return axios.delete(`https://${API_URL}/api/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const findAllFavorites = async (userId, accessToken, filters = {}) => {
  const params = {
    userId,
    size: 500,
    ...filters,
  };

  const queryString = qs.stringify(params, {
    arrayFormat: "repeat",
    skipNulls: true,
    encoder: (value) => encodeURIComponent(value),
  });

  return await axios.get(
    `https://${API_URL}/api/routes/favorites?${queryString}`,
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
    `https://${API_URL}/api/routes/favorites`,
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
  return axios.delete(`https://${API_URL}/api/routes/favorites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      routeId: routeId,
      userId: userId,
    },
  });
};

export const findDoneRoutes = async (userId, accessToken, filters = {}) => {
  const params = {
    userId,
    ...filters,
  };

  const queryString = qs.stringify(params, {
    arrayFormat: "repeat",
    skipNulls: true,
    encoder: (value) => encodeURIComponent(value),
  });

  return await axios.get(
    `https://${API_URL}/api/routes/passed?${queryString}`,
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
    `https://${API_URL}/api/routes/passed`,
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
