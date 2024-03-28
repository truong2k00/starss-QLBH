import axios from "@/plugins/axios";

const CONTROLLER_NAME = "Role";

const GetAll = async () => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetAll`);
    console.log(res.data);
    return res.data;
  } catch {
    return null;
  }
};

const Update = async (id: number, name: null) => {
  try {
    await axios.put(`${CONTROLLER_NAME}/Update?iD=${id}&roleName=` + name);
  } catch {}
};

const roleServices = {
  GetAll,
  Update,
};

export default roleServices;
