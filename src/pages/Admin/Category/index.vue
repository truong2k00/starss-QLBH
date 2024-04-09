<template>
  <v-card align="center">
    <header>
      <span style="height: 2em">
        <h2 style="margin-left: 18px">Category</h2>
      </span>
    </header>
  </v-card>
  <VDataTable
    ref="table"
    expand-on-click
    :headers="tableConfig.headers"
    :items="tableConfig.data"
  >
    <template #item.image="{ item }"
      ><template v-if="editingItemIds.includes(item.value.productCategoryID)">
        <VImg
          width="3rem"
          @click="handelImageCLick"
          aspect-ratio="16/9"
          cover
          :src="item.value.image" />
        <v-file-input
          ref="inputfile"
          type="file"
          name="file"
          v-show="false"
          accept=".jpeg,.png,.jpg,GIF"
          v-model="inputFile"
          @change="onSavechange($event, item)"
          label="File input"
          prepend-icon="mdi-camera"
          variant="filled"
        ></v-file-input
      ></template>
      <template v-else
        ><v-img
          width="3rem"
          aspect-ratio="16/9"
          cover
          :src="item.value.image"
        ></v-img
      ></template>
    </template>
    <template #item.categoryName="{ item }">
      <template v-if="editingItemIds.includes(item.value.productCategoryID)">
        <!-- Hiển thị trường dữ liệu cho phép chỉnh sửa -->
        <v-card
          ><v-text-field
            v-model="editedCategoryName"
            @input="onEditCategoryName(item)"
          ></v-text-field>
        </v-card>
      </template>
      <template v-else>
        <!-- Hiển thị trường dữ liệu chỉ đọc -->
        <span>{{ item.value.categoryName }}</span>
      </template>
    </template>

    <template #item.action="{ item }">
      <template v-if="!editingItemIds.includes(item.value.productCategoryID)">
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
          @click="onSavechangeName(item)"
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
import category from "@/services/categoryServices";
import checkPictures from "@/common/Untilitie/pictures";
import { fa } from "vuetify/lib/locale";
import { tr } from "vuetify/lib/locale";
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import DataTableHelper from "@/common/untilities/dataTableHelper";

const instance = getCurrentInstance();
//click update
const editIconClick = ref(false);
const editingItemIds = ref([]);

const handelImageCLick = () => {
  instance?.refs.inputfile.click();
};

const editedCategoryName = ref("");
const tableConfig = ref(
  DataTableHelper.initTableConfig([
    { title: "", key: "data-table-expand" },
    { title: "Image", key: "image" },
    { title: "Name", key: "categoryName" },
    { title: "Action", key: "action" },
  ])
);

const deleteProduct = (item) => {
  alert(JSON.stringify(item.value.productCategoryID));
};

const onEditItem = (item) => {
  editingItemIds.value = [];
  inputFile.value = null;
  editedCategoryName.value = item.value.categoryName;
  editingItemIds.value.push(item.value.productCategoryID);
  editIconClick.value = true;
};

const loadData = async () => {
  const res = await category.GetAll();
  tableConfig.value = DataTableHelper.updatePagination(
    tableConfig.value,
    res,
    []
  );
};

const errTextPictures = ref("");

const inputFile = ref("");

// Hàm xử lý khi người dùng chọn file mới
const onCancelEdit = () => {
  editingItemIds.value = [];
  editIconClick.value = !editIconClick;
};
//update categoryname
const onSavechangeName = (item) => {
  item.value.categoryName = editedCategoryName.value;
  category.Update(item.value.productCategoryID, item.value.categoryName);
  editIconClick.value = !editIconClick;
  editingItemIds.value = [];
};

//update categoryname and upload image
const onSavechange = (event, item) => {
  const file = event.target.files[0];

  if (!file) {
    item.value.categoryName = editedCategoryName.value;
    category.Update(item.value.productCategoryID, item.value.categoryName);
    loadData();
    editIconClick.value = !editIconClick;
    editingItemIds.value = [];
    return;
  }

  item.value.categoryName = editedCategoryName.value;
  category.Update(item.value.productCategoryID, item.value.categoryName, file);
  loadData();
  editIconClick.value = !editIconClick;
  editingItemIds.value = [];
};

//load data to tableconfig
onMounted(() => {
  loadData();
});
</script>