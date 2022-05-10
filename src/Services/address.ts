import axios from "axios";
import { url } from "./url";
import TokenService from "./token";

const getMyAddresses = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);

  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token
  }
  const res = await axios.get(`${url}/address`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return res
};

const AddressService = {
  getMyAddresses
}

export default AddressService;
