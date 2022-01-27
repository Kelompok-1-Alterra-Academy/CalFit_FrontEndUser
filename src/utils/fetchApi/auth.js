import { setCookie } from "nookies";

export default async function auth(path, { email, password, photo }, setData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/${path}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        photo,
      }),
    }
  );
  const data = await res.json();
  if (path === "loginOAuth") {
    setData(data.data);
    setCookie(null, "token", data.data?.token);
  } else {
    setData({ password: "" });
  }
  if (data.success === false) throw new Error(data.message);
  return data;
}
