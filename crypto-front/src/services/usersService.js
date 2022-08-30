import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";
setTokenHeader();

// provide token and header name to set as default header on http calls

function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

// create new user

export function createUser(body) {
  return httpService.post("/users", body);
}

// login a user

export async function loginUser(body) {
  const { data } = await httpService.post("/auth", body);
  localStorage.setItem(TOKEN_KEY, data.token);

  setTokenHeader();
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

// get token from localstorage

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

// get user details

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
