import { BEATFILM_URL } from './constants';
import { getResponse } from "./getResponse";

export const getAllMovies = () => {
  return fetch(`${BEATFILM_URL}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(getResponse)
};