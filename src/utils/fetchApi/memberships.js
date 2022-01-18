import baseApi from "./api";

export const getAllMemberships = async (setLoadingState, setData, { limit, page }) => {
  setLoadingState(true);
  return (
    baseApi
      .get(`/memberships`)
      .then((res) => {
        setData(res.data.data ?? []);
      })
      // .catch((err) => {
      //   dispatch(alertSetMessage(err.message));
      //   dispatch(alertSetError(true));
      //   dispatch(alertSetSuccess(false));
      // })
      .finally(() => {
        setLoadingState(false);
      })
  );
};

export const getMembershipsById = async (setLoadingState, setData, id) => {
  setLoadingState(true);
  return baseApi
    .get(`/memberships/${id}`)
    .then((res) => {
      setData(res.data.data ?? []);
    })
    .finally(() => {
      setLoadingState(false);
    });
};
