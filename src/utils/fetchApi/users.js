import { baseApi } from "./api";

export const getUserByID = async (token, setData, id) => {
  try {
    return await baseApi
      .get(`account/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: { data } }) => {
        return setData(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = (token, data) => {
  return baseApi
    .put(
      "account",
      {
        email: data.email,
        fullname: data.fullname,
        password: data.password,
        photo: data.photo,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((data) => data);
};
