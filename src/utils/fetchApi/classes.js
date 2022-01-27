import { parseCookies } from "nookies";
import { baseApi } from "./api";

export const getAllClasses = async (
  setLoadingState,
  setData,
  { limit, page, filter = undefined }
) => {
  let url = `/classes?limit=${limit}&page=${page}`;
  if (filter?.online === true) {
    url = `/classes?limit=${limit}&page=${page}&online=${filter.online}`;
  }
  setLoadingState(true);
  return baseApi
    .get(url)
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

export const getBookingsByID = async (setData, id) => {
  const { token } = parseCookies();
  try {
    return await baseApi
      .get(`bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: { data } }) => {
        const date = new Date(`${data.created_at}`.split("T")[0]);
        return setData({
          ...data,
          created_at: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
        });
      });
  } catch (error) {
    console.log(error.message);
  }
};
