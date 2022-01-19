import { parseCookies } from "nookies";
import baseApi from "./api";

export const getAllClasses = async (
  setLoadingState,
  setData,
  { limit, page }
) => {
  setLoadingState(true);
  return baseApi
    .get(`/classes?limit=${limit}&page=${page}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

export const getClassById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/classes/${id}`)
    .then((res) => setData(res.data.data))
    .finally(() => setLoadingState(false));
};

export const bookingClass = async (setLoadingState, data) => {
  console.log(data);
  setLoadingState(true);
  try {
    return await baseApi.post(`classes/${data.class_id}/bookings`, data);
  } finally {
    return setLoadingState(false);
  }
};

export const mybookings = async (setData, id) => {
  const { token } = parseCookies();
  try {
    return await baseApi
      .get(`account/${id}/mybookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data.data));
  } catch (error) {
    console.log(error.message);
  }
};
