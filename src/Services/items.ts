import axios from "axios";
import { url } from "./url";
import TokenService from "./token";

const getAllItems = async () => {
  const res = await axios.get(`${url}/item`);
  return res;
}

const ItemService = {
  getAllItems
}

export default ItemService;
