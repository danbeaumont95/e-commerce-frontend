import axios from "axios";
import { url } from "./url";

const getAmountOfItemsInBasket = async (token: string) => {
  const res = await axios.get(`${url}/basket/amount`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  return res
}

const BasketService = {
  getAmountOfItemsInBasket
}

export default BasketService
