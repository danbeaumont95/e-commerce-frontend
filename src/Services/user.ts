import axios from "axios";
import { url } from "./url";

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

const exportObj = {
  login,
  signUp
}

export default exportObj