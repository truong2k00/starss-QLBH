<template>
  <v-card align="center">
    <header>
      <span style="height: 2em">
        <h2 style="margin-left: 18px">Bill Status</h2>
      </span>
    </header>
  </v-card>
  <VDataTable
    ref="table"
    expand-on-click
    :headers="tableConfig.headers"
    :items="tableConfig.data"
    :header-props="{
      sticky: true,
      style: {
        'background-color': '#000000',
        color: '#333',
        'font-weight': 'bold',
        padding: '10px',
      },
    }"
  >
    <template #item.dataBill="{ item }"
      ><VChip
        :color="status.resolveStatusCount(item.value.dataBill).color"
        class="font-weight-medium"
        size="small"
      >
        {{ status.resolveStatusCount(item.value.dataBill).text }}
      </VChip></template
    >
    <template #item.status_Name="{ item }">
      <template v-if="editingItemIds.includes(item.value.statusBillId)">
        <!-- Hiển thị trường dữ liệu cho phép chỉnh sửa -->
        <v-card
          ><v-text-field
            accept="image/*"
            v-model="editedstatus_Name"
            @input="onEditCategoryName(item)"
          ></v-text-field>
        </v-card>
      </template>
      <template v-else>
        <!-- Hiển thị trường dữ liệu chỉ đọc -->
        <span>{{ item.value.status_Name }}</span>
      </template>
    </template>

    <template #item.action="{ item }">
      <VBtn @click="onview(item)">
        Edit
        <VIcon end icon="mdi-file-find" />
      </VBtn> </template
  ></VDataTable>
  <dialogcue ref="dialogcuelog"></dialogcue>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import status from "@/common/untilities/statusVariant";
import dialogcue from "@/pages/Admin/StatusBill/DialogCUE.vue";
import statusbillServices from "@/services/statusbillServices";
import billservices from "@/services/bill.api";
import { fa } from "vuetify/lib/locale";
import { tr } from "vuetify/lib/locale";
import { ITEMS_PER_PAGE_OPTIONS } from "@/common/constants/totalpage";
import DataTableHelper from "@/common/untilities/dataTableHelper";
import router from "@/router";

const editIconClick = ref(false);
const editingItemIds = ref([]);

const instance = getCurrentInstance();
const onview = (item) => {
  // instance?.refs.dialogcuelog.showCreateEditDialog(item.value, true);
  router.push("bill?statusID=" + item.value.statusBillId);
};

const editedstatus_Name = ref("");
const tableConfig = ref(
  DataTableHelper.initTableConfig([
    { title: "", key: "dataBill" },
    { title: "Status Name", key: "status_Name" },
    { title: "Action", key: "action" },
  ])
);

const addDataBill = async () => {
  for (const item of tableConfig.value.data) {
    // Đếm số lượng thuộc tính của từng đối tượng (trừ đi thuộc tính id)
    const res = await getcountStatus(item.statusBillId);
    console.log(res.data);

    // Thêm thuộc tính count vào từng đối tượng
    item.dataBill = res.data.length;
  }
};

const getcountStatus = async (id) => {
  try {
    const res = await billservices.GetBill(id);
    return res;
  } catch (error) {
    console.error("Error occurred while fetching bill status:", error);
    return 0; // Return 0 in case of error
  }
};

const onEditItem = (item) => {
  editingItemIds.value = [];
  editedstatus_Name.value = item.value.status_Name;
  editingItemIds.value.push(item.value.statusBillId);
  editIconClick.value = true;
};

const loadData = async () => {
  const res = await statusbillServices.GetAll();
  const tabledata = DataTableHelper.updatePagination(
    tableConfig.value,
    res,
    res.pagination
  );
  tableConfig.value = tabledata;

  await addDataBill();
};

const onCancelEdit = () => {
  editingItemIds.value = [];
  editIconClick.value = !editIconClick;
};

const onSavechange = (item) => {
  item.value.status_Name = editedstatus_Name.value;
  statusbillServices.Update(item.value.statusBillId, item.value.status_Name);
  editIconClick.value = !editIconClick;
  editingItemIds.value = [];
};

onMounted(() => {
  loadData();
});
</script>


<style scoped>
.custom-header {
  color: blue;
}
</style>