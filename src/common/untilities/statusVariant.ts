import StatusBill from "@/common/constants/StatusBill";

const resolveStatusVariant = (status?: number) => {
  console.log(status);

  if (status === 1) return { color: "error", text: StatusBill.Created };
  else if (status === 2)
    return { color: "lime", text: StatusBill.Pending_Confirmation };
  else if (status === 3) return { color: "cyan", text: StatusBill.Confirmed };
  else if (status === 4)
    return { color: "indigo", text: StatusBill.In_Progress_Delivery };
  else if (status === 5) return { color: "purple", text: StatusBill.Delivered };
  else if (status === 6) return { color: "primary", text: StatusBill.Paid };
  else if (status === 7)
    return { color: "warning", text: StatusBill.Cancelled };
  else if (status === 8)
    return { color: "info", text: StatusBill.Pending_Processing };
  else status === 9;
  return { color: "success", text: StatusBill.Completed };
};

const resolveStatusCount = (status: number) => {
  if (status > 100) {
    return { color: "error", text: status };
  } else if (status >= 50) return { color: "info", text: status };
  else if (status >= 30) return { color: "success", text: status };
  else if (status >= 20) return { color: "warning", text: status };
  else if (status >= 1) return { color: "primary", text: status };
  else return { color: "info", text: status };
};

const status = {
  resolveStatusVariant,
  resolveStatusCount,
};

export default status;
