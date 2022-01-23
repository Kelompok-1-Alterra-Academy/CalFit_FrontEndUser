import baseApi from "./api";

export const getUserByUsername = async (token, setData, email) => {
  try {
    return await baseApi
      .post(
        `account`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data: { data } }) => {
        return setData(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (token, data) => {
  try {
    return await baseApi.put(
      "account",
      { email: data.email, username: data.username, password: data.password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.log(error.message);
  }
};
