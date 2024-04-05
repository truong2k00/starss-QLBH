import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Account";
const CONTROLLER_GETBYID = "GetByID";
const CONTROLLER_GETALL = "GetAll";

const GetByID = async (query?: any) => {
  console.log(query);
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/${CONTROLLER_GETBYID}`);
    return res;
  } catch {
    return null;
  }
};

const GetAll = async (id: number) => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/${CONTROLLER_GETALL}`);
    return res;
  } catch {
    return "Failed";
  }
};

const Product = {
  GetAll,
  GetByID,
};

export default Product;
