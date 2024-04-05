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
        @click="viewData(item)"
        title="Edit"
      ></VBtn> </template
  ></VDataTable>
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import statusbillServices from "@/services/statusbillServices";
import { fa } from "vuetify/lib/locale";
import { tr } from "vuetify/lib/locale";

const editIconClick = ref(false);
const editingItemIds = ref([]);

const editedstatus_Name = ref("");
const tableConfig = ref({
  headers: [
    { title: "", key: "data-table-expand" },
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