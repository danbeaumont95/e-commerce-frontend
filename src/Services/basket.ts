import axios from "axios";
import { url } from "./url";
import TokenService from "./token";

const getAmountOfItemsInBasket = async (token: string) => {

  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data.access_token
  }


  const res = await axios.get(`${url}/basket/amount`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
};

const getMyBasket = async (token: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data.access_token) {
    token = checkIfTokenValid.data?.access_token
  }
  const res = await axios.get(`${url}/basket`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const deleteItemFromBasket = async (token: string, id: string) => {
  const refreshToken: any = localStorage.getItem('refreshToken');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data.access_token
  }
  const res = await axios.delete(`${url}/basket/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const BasketService = {
  getAmountOfItemsInBasket,
  getMyBasket,
  deleteItemFromBasket
}

export default BasketService
