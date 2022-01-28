import { baseApi } from "./api";

export const getAllNewsletters = async (setData) => {
  return baseApi.get(`/newsletters`).then((res) => {
    setData(res.data.data ?? []);
  });
};

export const getMembershipsById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/newsletters/${id}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};