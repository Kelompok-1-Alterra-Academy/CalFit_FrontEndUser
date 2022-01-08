import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

export default baseApi;
// export { baseApi};
