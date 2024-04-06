import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Bills";

const GetBillStatusID = async (id: number) => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetBillStatusID/${id}`);

    return res;
  } catch {
    return "sss";
  }
};

const Update = async (id: number, name: null) => {
  try {
    await axios.put(`${CONTROLLER_NAME}/Update/${id}?status_Name=${name}`);
  } catch {}
};

const billServices = {
  GetBillStatusID,
  Update,
};

export default billServices;
