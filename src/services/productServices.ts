import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Product";
const CONTROLLER_DELETE = "Delete";

const GetAll = async (query?: any) => {
  console.log(query);
  try {
    const res = await axios.post(`${CONTROLLER_NAME}/GetAll`, {
      pagination: {
        pageNo: 0,
        keyWord: query.keyWord,
      },
      keyWord: query.keyWord,
      accountID: 0,
      categoryIDs: query.categoryIDs,
      sale: query.sale,
    });
    return res.data;
  } catch {
    return null;
  }
};

const DeleteProduct = async () => {
  try {
    const res = await axios.delete(`${CONTROLLER_NAME}/` + CONTROLLER_DELETE);
  } catch {
    return null;
  }
};

const Product = {
  GetAll,
  DeleteProduct,
};

export default Product;
