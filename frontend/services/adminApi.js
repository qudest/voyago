import axios from "axios";
import { API_URL } from "../variables/ip";

export const findAllUsers = async (accessToken) => {
  return axios.get(`https://${API_URL}/api/account`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, application/yaml",
    },
  });
};

export const deleteUser = async (userId, accessToken) => {
  return axios.delete(`https://${API_URL}/api/account/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllRoutes = async (accessToken, params = {}) => {
  try {
    const queryString = Object.entries(params)
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
    throw error;
  }
};

export const deleteRoute = async (routeId, accessToken) => {
  return axios.delete(`https://${API_URL}/api/routes/${routeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
