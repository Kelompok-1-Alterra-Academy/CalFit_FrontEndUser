export default async function auth(path, { email, password }) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === false) throw new Error(data.message);
      return data;
    });
}
