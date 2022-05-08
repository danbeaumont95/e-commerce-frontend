import axios from "axios";
import { url } from "./url";
import TokenService from "./token";

const login = async (email: string, password: string) => {
  const res = await axios.post(`${url}/user/login`, {
    email,
    password
  })
  return res
}

const signUp = async (firstName: string, lastName: string, email: string, password: string, mobileNumber: number, username: string) => {
  const res = await axios.post(`${url}/user`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    username
  })
  return res
}

const getMyDetails = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token
  }
  const res = await axios.get(`http://127.0.0.1:8000/user/me/details`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  return res
}

const updateMyDetails = async (token: string, details: object) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data.access_token) {
    token = checkIfTokenValid.data?.access_token
  }
  const res = await axios.put(`${url}/user/me/details`, details, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const UserService = {
  login,
  signUp,
  getMyDetails,
  updateMyDetails
}

export default UserService
