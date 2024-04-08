import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Bills";

const GetBill = async (id?: number) => {
  try {
    const res = await axios.post(`${CONTROLLER_NAME}/GetBill`, {
      reqPagination: {
        pageSize: 1000000,
        pageNo: 0,
        keyWord: "",
      },
      statusbillID: id,
      accountID: 0,
      isDelete: false,
    });
    return res.data;
  } catch {
    return null;
  }
};

const GetByID = async (id?: number) => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetByID/${id}`);
    return res;
  } catch {
    return null;
  }
};

const GetAllBill = async (
  reqPagination?: any,
  statusiD?: any,
  accountid?: any,
  action?: boolean
) => {
  try {
    const res = await axios.post(`${CONTROLLER_NAME}/GetBill`, {
      reqPagination: {
        ...reqPagination,
      },
      statusbillID: statusiD,
      accountID: accountid,
      isDelete: action,
    });
    return res.data;
  } catch {
    console.log("res");
    return null;
  }
};

const Update = async (id: number, name: null) => {
  try {
    await axios.put(`${CONTROLLER_NAME}/Update/${id}?status_Name=${name}`);
  } catch {}
};

const billServices = {
  GetBill,
  GetAllBill,
  GetByID,
  Update,
};

export default billServices;
