import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Product";
const CONTROLLER_DELETE = "Delete";

const GetAll = async (query?: any, reqPagination?: any) => {
  try {
    const res = await axios.post(`${CONTROLLER_NAME}/GetAll`, {
      reqPagination: {
        ...reqPagination,
      },
      keyWord: query.keyWord,
      accountID: 0,
      categoryIDs: query.categoryIDs,
      sale: query.sale,
    });
    console.log(res.data);
    return res.data;
  } catch {
    return null;
  }
};

const update = async (id: number, query?: any) => {
  console.log(query);
  debugger;
  try {
    const res = await axios.put(`${CONTROLLER_NAME}/update?id=${id}`, {
      ...query,
    });
    return "Success";
  } catch {
    return "Update Failed";
  }
};

const DeleteProduct = async (id: number) => {
  try {
    const res = await axios.delete(
      `${CONTROLLER_NAME}/${CONTROLLER_DELETE}/${id}`
    );
    return "Success";
  } catch {
    return "Delete Failed";
  }
};

const Product = {
  GetAll,
  update,
  DeleteProduct,
};

export default Product;
