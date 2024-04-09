<template>
  <VDataTable
    :headers="tableconfig.headers"
    :items="tableconfig.data"
    :items-per-page="pageSize"
    :page="tableconfig.pagination.pageNo"
    class="elevation-1"
    ><template #item.action="{ item }">
      <VBtn color="success" variant="tonal" @click="onview(item)">
        View
        <VIcon end icon="mdi-file-find" />
      </VBtn>
    </template>
    <template #item.status_Name="{ item }">
      <VChip
        :color="status.resolveStatusVariant(item.value.statusBillID).color"
        class="font-weight-medium"
        size="small"
      >
        {{ status.resolveStatusVariant(item.value.statusBillID).text }}
      </VChip>
    </template>

    <template #bottom>
      <VCardText class="pt-2">
        <VRow>
          <VCol lg="2" cols="3">
            <VTextField
              v-model="tableconfig.pagination.pageSize"
              label="Page Size:"
              type="number"
              min="-1"
              max="15"
              hide-details
              variant="underlined"
              @blur="onPageSizeChage"
            />
          </VCol>

          <VCol lg="10" cols="9" class="d-flex justify-end">
            <VPagination
              v-model="tableconfig.pagination.pageNo"
              total-visible="5"
              :length="tableconfig.pagination.totalPages"
            />
          </VCol>
        </VRow>
      </VCardText>
    </template>
  </VDataTable>
  <dialogcue ref="dialogcuelog"></dialogcue>
</template>

<script setup lang="ts">
import DataTableHelper from "@/common/untilities/dataTableHelper";
import billServices from "@/services/bill.api";
import status from "@/common/untilities/statusVariant";
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

const onPageSizeChage = () => {
  reqPagination.value.pageSize = tableconfig.value.pagination.pageSize;
  loadData();
  console.log(tableconfig.value.pagination);
};

const loadData = () => {
  loadDataTable(
    reqPagination.value,
    statusid.value,
    accountID.value,
    action.value
  );
};

const loading = () => {
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

  loadData();
};

watchEffect(() => {
  console.log("PageSize changed:", pageSize.value);
});

onMounted(() => {
  loading();
});
</script>


<style scoped>
.elevation-1 {
  color: red;
}
</style>