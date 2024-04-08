<template>
  <VDataTable
    :headers="tableconfig.headers"
    :items="tableconfig.data"
    :items-per-page="pageSize"
    :items-per-page-options="tableconfig.pagination.pageSizeOptions"
    ><template #item.action="{ item }">
      <VBtn color="success" variant="tonal" @click="onview(item)">
        View
        <VIcon end icon="mdi-file-find" />
      </VBtn>
    </template>
  </VDataTable>
  <dialogcue ref="dialogcuelog"></dialogcue>
</template>

<script setup lang="ts">
import DataTableHelper from "@/common/untilities/dataTableHelper";
import billServices from "@/services/bill.api";
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import dialogcue from "@/pages/Admin/Bill/DialogCUE_Bill.vue";
import { VDataTable } from "vuetify/labs/VDataTable";

const instance = getCurrentInstance();

const onview = (item) => {
  instance?.refs.dialogcuelog.showCreateEditDialog(item.value, true);
};

const tableconfig = ref(
  DataTableHelper.initTableConfig([
    { title: "Tài khoản tạo", key: "userName" },
    { title: "Thời gian tạo", key: "date_Create" },
    { title: "Trạng thái", key: "status_Name" },
    { title: "Thành Tiền", key: "totalPrice" },
    { title: "Địa Chỉ", key: "address" },
    { title: "Action", key: "action" },
  ])
);

const loadDataTable = async (
  reqpagination?: any,
  statusiD?: any,
  accountid?: any,
  action?: boolean
) => {
  try {
    const res = await billServices.GetAllBill(
      reqpagination,
      statusiD,
      accountid,
      action
    );
    const tabledata = DataTableHelper.updatePagination(
      tableconfig.value,
      res.data,
      res.pagination
    );
    tableconfig.value = tabledata;
    console.log(tableconfig);
  } catch (error) {
    alert("Error loading categories:");
  }
};

const pageNo = ref(1);
const pageSize = ref(20);
const statusid = ref(0);
const accountID = ref(0);
const action = ref(false);
const searchText = ref(null);
const reqPagination = ref({});

const dpen = () => {
  const currentURL = window.location.href;

  // Tạo một URLSearchParams từ URL hiện tại
  const urlParams = new URLSearchParams(new URL(currentURL).search);

  // Lấy giá trị của tham số 'statusID'
  const statusID = urlParams.get("statusID");
  const pageno = urlParams.get("pageNo");
  const pagesize = urlParams.get("pageSize");
  const searchtext = urlParams.get("searchText");
  const accountid = urlParams.get("accountID");
  const status = urlParams.get("action");

  // Kiểm tra nếu 'statusID' tồn tại và không rỗng
  if (statusID !== null && statusID !== "") {
    statusid.value = statusID;
  }
  if (pageno != null && pageno != "") {
    pageNo.value = pageno;
  }
  if (pagesize != null && pagesize != "") {
    pageSize.value = pagesize;
  }
  if (searchtext != null && searchtext != "") {
    searchText.value = searchtext;
  }
  if (accountid != null && accountid != "") {
    accountID.value = accountid;
  }
  if (status != null && status != "") {
    action.value = status;
  }

  reqPagination.value = {
    pageSize: pageSize.value,
    pageNo: pageNo.value,
    keyWord: searchText.value,
  };

  loadDataTable(
    reqPagination.value,
    statusid.value,
    accountID.value,
    action.value
  );
};

watchEffect(() => {
  console.log("PageSize changed:", pageSize.value);
});

onMounted(() => {
  dpen();
});
</script>
