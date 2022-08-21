import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";
setTokenHeader();

function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(body) {
  return httpService.post("/users", body);
}

export async function loginUser(body) {
  const { data } = await httpService.post("/auth", body);
  localStorage.setItem(TOKEN_KEY, data.token);

  setTokenHeader();
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const usersService = {
  createUser,
  loginUser,
  logout,
  getJWT,
  getUser,
};

export default usersService;
