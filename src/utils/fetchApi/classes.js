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
