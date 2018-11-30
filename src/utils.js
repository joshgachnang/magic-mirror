// const API_URL = "http://localhost:8080/";
const API_URL = "https://val.nang.io/";

export function getApiUrl(path) {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  return `${API_URL}${path}?token=${token}`;
}
