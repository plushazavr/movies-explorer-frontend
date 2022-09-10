import { BASE_URL } from "./constants";
import { getResponse } from "./getResponse";

export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email, name }),
    credentials: 'include',
  })
    .then(getResponse)
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(getResponse)
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
    .then(getResponse)
};

export const updateUser = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email }),
    credentials: 'include',
  })
    .then(getResponse)
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
    .then(getResponse)
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
    .then(getResponse)
};

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movie),
    credentials: 'include',
  })
    .then(getResponse)
};

export const removeMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
    .then(getResponse)
};