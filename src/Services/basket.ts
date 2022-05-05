import axios from "axios";
import { url } from "./url";

const getAmountOfItemsInBasket = async (token: string) => {
  const res = await axios.get(`${url}/basket/amount`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
};

const getMyBasket = async (token: string) => {
  const res = await axios.get(`${url}/basket`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const deleteItemFromBasket = async (token: string, id: string) => {
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
