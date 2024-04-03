const checkPictures = (file: File) => {
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileName = file.name;

  if (file.size > maxSizeInBytes) {
    const resMessage = "Kích thước ảnh không được vượt quá 2MB";
    return resMessage;
  }
  const fileExtension = fileName.split(".").pop();
  if (!allowedExtensions.includes("." + fileExtension.toLowerCase())) {
    const resMessage = "Hệ thống chỉ hỗ trợ file ảnh dạng: jpg, png, jpeg";
    return resMessage;
  }
  return null;
};

export default checkPictures;
