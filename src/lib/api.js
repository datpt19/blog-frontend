import axios from "axios";
// import { API_BASE_URL } from '../constants';
import { Storage } from "lib/storage";

const API_BASE_URL = "";

export const getPost = (postId) =>
  axios.get(`${API_BASE_URL}/api/posts/${postId}`);
export const getPosts = ({ page, size }) =>
  axios.get(`${API_BASE_URL}/api/posts?page=${page}&size=${size}`);
export const writePost = (title, body, seriesPostId) =>
  axios.post(
    `${API_BASE_URL}/api/posts`,
    { title, body, seriesPostId },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
export const editPost = (id, title, body, seriesPostId) =>
  axios.put(
    `${API_BASE_URL}/api/posts/${id}`,
    { id, title, body, seriesPostId },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
export const deletePost = (id) =>
  axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
export const login = (email, password) =>
  axios.post(`${API_BASE_URL}/auth/authenticate`, { email, password });
export const getUser = () =>
  axios.post(
    `${API_BASE_URL}/auth/user`,
    {},
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
export const getComments = (postId) =>
  axios.get(`${API_BASE_URL}/api/comments/posts/${postId}`);

export const writeComment = (postId, body) =>
  axios.post(
    `${API_BASE_URL}/api/comments/posts/${postId}`,
    { postId, body },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );

const getToken = () => {
  const token =
    Storage.local.get("__AUTH__") || Storage.session.get("__AUTH__");
  return `Bearer ${token}`;
};

//series post list
export const getSeiresListPosts = ({ page, size }) =>
  axios.get(`${API_BASE_URL}/api/series?page=${page}&size=${size}`);
export const getDetailSeries = (id) =>
  axios.get(`${API_BASE_URL}/api/series/${id}`);

export const writeSeries = (seriesId, title, description, hashtag) =>
  axios.post(
    `${API_BASE_URL}/api/series/createSeriesPost`,
    { seriesId, title, description, hashtag },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
// export const deleteSeries = (id) =>
//   axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
//     headers: {
//       Authorization: getToken(),
//     },
//   });
