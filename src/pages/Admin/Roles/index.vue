<template>
  <v-card align="center">
    <header>
      <span style="height: 2em">
        <h2 style="margin-left: 18px">Roles</h2>
      </span>
    </header>
  </v-card>
  <VDataTable
    ref="table"
    expand-on-click
    :headers="tableConfig.headers"
    :items="tableConfig.data"
  >
   
    <template #item.roleName="{ item }">
      <template v-if="editingItemIds.includes(item.value.roleID)">
        <!-- Hiển thị trường dữ liệu cho phép chỉnh sửa -->
        <v-card
          ><v-text-field
            v-model="editedRoleName"
            @input="onEditCategoryName(item)"
          ></v-text-field>
        </v-card>
      </template>
      <template v-else>
        <!-- Hiển thị trường dữ liệu chỉ đọc -->
        <span>{{ item.value.roleName }}</span>
      </template>
    </template>

    <template #item.action="{ item }">
      <template v-if="!editingItemIds.includes(item.value.roleID)">
        <VBtn
          color="#1E88E5"
          icon="mdi-pencil"
          density="compact"
          @click="onEditItem(item)"
          title="Edit"
        ></VBtn>
        {{}}
        <VBtn
          color="error"
          icon="mdi-trash-can"
          title="Delete"
          density="compact"
          @click="deleteProduct(item)"
        ></VBtn>
      </template>
      <template v-else>
        <VBtn
          color="#1E88E5"
          icon="mdi-swap-vertical-circle"
          density="compact"
          title="Save"
          @click="onSavechange(item)"
        ></VBtn>
        {{}}
        <VBtn
          color="#D50000"
          icon="mdi-cancel"
          title="Cancel"
          density="compact"
          @click="onCancelEdit()"
        ></VBtn>
      </template> </template
  ></VDataTable>
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import roleServices from "@/services/rolesServices";
import { fa } from "vuetify/lib/locale";
import { tr } from "vuetify/lib/locale";

const editIconClick = ref(false);
const editingItemIds = ref([]);

const editedRoleName = ref("");
const tableConfig = ref({
  headers: [
    { title: "", key: "data-table-expand" },
    { title: "Role Name", key: "roleName" },
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
  editedRoleName.value = item.value.roleName;
  editingItemIds.value.push(item.value.roleID);
  editIconClick.value = true;
  console.log(editingItemIds);
};

const loadData = async () => {
  const res = await roleServices.GetAll();
  tableConfig.value.data = res;
  console.log(tableConfig);
};

const onCancelEdit = () => {
  editingItemIds.value = [];
  editIconClick.value = !editIconClick;
};

const onSavechange = (item) => {
  item.value.roleName = editedRoleName.value;
  roleServices.Update(item.value.roleID, item.value.roleName);
  editIconClick.value = !editIconClick;
  editingItemIds.value = [];
};
onMounted(() => {
  loadData();
});
</script>