import axios from "@/plugins/axios";

const CONTROLLER_NAME = "ProductCategory";
const CONTROLLER_DELETE = "Delete";
const CONTROLLER_CREATE = "Create";

const GetAll = async () => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetAll`);
    return res.data;
  } catch {
    return null;
  }
};

const Update = async (id: number, name: null, file?: File) => {
  try {
    if (!file) {
      await axios.put(`${CONTROLLER_NAME}/Update/${id}?categoryName=` + name);
    } else {
      const formData = new FormData();
      formData.append("files", file);
      await axios.put(
        `${CONTROLLER_NAME}/Update/${id}?categoryName=${name}`, // Đảm bảo rằng bạn đã đặt đúng URL endpoint của bạn và truyền tham số cần thiết
        formData, // Truyền FormData object chứa tệp và dữ liệu khác
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu của yêu cầu thành 'multipart/form-data'
          },
        }
      );
    }
  } catch {}
};

const Delete = async (id: number) => {
  try {
    await axios.delete(`${CONTROLLER_NAME}/${CONTROLLER_DELETE}/${id}`);
  } catch {}
};

const Create = async (name: null, imgFile: File) => {
  try {
    const formData = new FormData();
    formData.append("files", imgFile);

    await axios.post(
      `${CONTROLLER_NAME}/${CONTROLLER_CREATE}`, // Đảm bảo rằng bạn đã đặt đúng URL endpoint của bạn và truyền tham số cần thiết
      formData, // Truyền FormData object chứa tệp và dữ liệu khác
      {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu của yêu cầu thành 'multipart/form-data'
        },
      }
    );
  } catch {}
};

const Category = {
  GetAll,
  Update,
  Delete,
  Create,
};

export default Category;
