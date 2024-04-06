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
    ><template #item.data-table-expand="{ item }"
      ><v-icon color="success"></v-icon>{{ countStatus(item) }}</template
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
      <VBtn
        color="#1E88E5"
        icon="mdi-file-find"
        density="compact"
        @click="onview(item)"
        title="Edit"
      ></VBtn> </template
  ></VDataTable>
  <dialogcue ref="dialogcuelog"></dialogcue>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import dialogcue from "@/pages/Admin/StatusBill/DialogCUE.vue";
import statusbillServices from "@/services/statusbillServices";
import billservices from "@/services/bill.api";
import { fa } from "vuetify/lib/locale";
import { tr } from "vuetify/lib/locale";
import { ITEMS_PER_PAGE_OPTIONS } from "@/common/constants/totalpage";

const editIconClick = ref(false);
const editingItemIds = ref([]);

const instance = getCurrentInstance();
const onview = (item) => {
  instance?.refs.dialogcuelog.showCreateEditDialog(
    item.value.statusBillId,
    true
  );
};

const editedstatus_Name = ref("");
const tableConfig = ref({
  headers: [
    { title: "Status Name", key: "status_Name" },
    { title: "Action", key: "action" },
  ],
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    totalPages: 1,
    totalItems: 1,
  },
});

const countStatus = async (item) => {
  console.log(await thenStatus(item));
};

const thenStatus = async (item) => {
  try {
    const res = await billservices.GetBillStatusID(item.value.statusBillId);

    if (res.data && res.data.length > 0) {
      return 1;
    } else {
      return 0;
    }
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
  console.log(editingItemIds);
};

const loadData = async () => {
  const res = await statusbillServices.GetAll();
  tableConfig.value.data = res;
  console.log(tableConfig);
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