import axios from "axios";
import { API_URL } from "../variables/ip";

export const postRating = async (routeId, rating, userId, accessToken) => {
  console.log(routeId, rating, userId, accessToken);
  return axios.post(
    `https://${API_URL}/api/ratings?userId=${userId}`,
    {
      routeId: Number(routeId),
      rating: Number(rating),
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

export const patchRating = async (accessToken) => {
  //валидация и перерасчет рейтинга
  return axios.post(`https://${API_URL}/api/ratings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getRating = async (routeId, accessToken) => {
  return axios.get(`https://${API_URL}/api/ratings/${routeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getRatingByUser = async (routeId, userId, accessToken) => {
  return axios.get(`https://${API_URL}/api/ratings`, {
    params: {
      routeId: routeId,
      userId: userId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
