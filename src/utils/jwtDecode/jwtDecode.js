export default function jwtDecode(token) {
  const decode = token.split(".")[1];
  const base64 = decode.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
