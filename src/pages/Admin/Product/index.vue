<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import nullproduct from "@/assets/images/avatars/nullproduct.png";
import reqPaginations from "@/common/untilities/reqPagination";
import addEditProduct from "./addEditProduct.vue";
import deleteDialog from "./deleteDialog.vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import ProductServices from "@/services/productServices";
import { IProductCategoryServicesRes } from "@/interfaces/res/Response_Models/IProductCategoryServices.res";
import category from "@/services/categoryServices";
import DataTableHelper from "@/common/untilities/dataTableHelper";

const queryParams: ISanPhamQueryParams = ref<ISanPhamQueryParams>({});
const categoryDatasource = ref([]);
const statusDatasource = ref([
  {
    title: "Active",
    value: true,
  },
  {
    title: "Inactive",
    value: false,
  },
]);

const tabledropdow = ref([]);

const instance = getCurrentInstance();
const workingItem = ref(null);
const loading = ref(false);
const searchText = ref("");
const showDialog = ref(false);
const table = ref("table");

const tableConfig = ref(
  DataTableHelper.initTableConfig([
    { title: "", key: "data-table-expand" },
    { title: "Người tạo", key: "username" },
    { title: "Image", key: "imageUrl" },
    { title: "Tên Sản Phẩm", key: "product_Name" },
    { title: "Giá Bán", key: "price" },
    { title: "Số Lượng", key: "quantity" },
    { title: "Thao tác", key: "action" },
  ])
);
const loadData = async (param?: any, reqPagination?: any) => {
  const res = await ProductServices.GetAll(param, reqPagination);
  const tabledata = DataTableHelper.updatePagination(
    tableConfig.value,
    res.data,
    res.pagination
  );
  tableConfig.value = tabledata;
};
onMounted(() => {
  loadCategory();
  loadData(paramnew);
});

const paramnew = {
  keyWord: "",
  categoryIDs: null,
  sale: false,
};

const loadCategory = async () => {
  try {
    const res = await category.GetAll();
    // Gán dữ liệu vào biến tham chiếu
    categoryDatasource.value = res; // Kiểm tra dữ liệu đã được gán vào biến tham chiếu
  } catch (error) {
    alert("Error loading categories:");
  }
};

const loadParam = () => {
  const keyWord = queryParams.value.searchText || "";

  // Xác định giá trị cho categoryIDs
  const categoryIDs =
    tabledropdow.value.map((item) => item.productCategoryID) || null;

  // Xác định giá trị cho sale
  const sale = queryParams.value.status?.value || false;

  // Tạo object param
  const param = {
    keyWord: keyWord,
    categoryIDs: categoryIDs,
    sale: sale,
  };
  return param;
};

const loadTableData = () => {
  // Tạo object param
  const reqPagination = reqPaginations(
    tableConfig.value.pagination.pageSize,
    tableConfig.value.pagination.pageNo,
    queryParams.searchText
  );
  const param = loadParam();
  loadData(param, reqPagination);
};

const onCreateEditClicked = () => {
  instance?.refs.createEditDialog.showCreateEditDialog();
};

const ondeleteClick = (item) => {
  // instance?.refs.createEditDialog.showCreateEditDialog();
  instance?.refs.deleteDialogProduct.showDeleteDialog(item.value);
};

const viewData = (item) => {
  // instance?.refs.createEditDialog.showCreateEditDialog();
  instance?.refs.createEditDialog.showCreateEditDialog(item, true);
};

const onEdititem = (item) => {
  instance?.refs.createEditDialog.showCreateEditDialog(item);
};

const onPageSizeChage = () => {
  const reqPagination = reqPaginations(
    tableConfig.value.pagination.pageSize,
    1,
    queryParams.searchText
  );
  const param = loadParam();
  console.log(reqPagination);

  loadData(param, reqPagination);
};

const onPageNo = () => {
  const reqPagination = reqPaginations(
    tableConfig.value.pagination.pageSize,
    tableConfig.value.pagination.pageNo,
    queryParams.searchText
  );
  const param = loadParam();

  loadData(param, reqPagination);
};

const onSearchInputBlur = () => {
  loadTableData();
};

const onCategoryDropdownChanged = () => {
  loadTableData();
};

const onStatusDropdownChanged = () => {
  loadTableData();
};
// Components
import { useRoute } from "vue-router";
import { all } from "axios";
import { ALL } from "dns";
/** Title */

const route = useRoute();
const pageName = ref("");
</script>


<template>
  <v-card>
    <v-card>
      <v-cart style="card-header fill-height height">
        <VRow min-width="12px">
          <VCol cols="8">
            <span style="height: 2em">
              <h2 style="font-size: 30px; margin-left: 18px">Product</h2>
            </span>
          </VCol>
          <VCol cols="4"> </VCol>
        </VRow>
      </v-cart>
      <div class="card-header fill-height height">
        <v-row>
          <v-col class="search-area" cols="3">
            <v-text-field
              v-model="queryParams.searchText"
              placeholder="Search..."
              variant="solo"
              solo-inverted
              @blur="onSearchInputBlur"
            />
          </v-col>
          <v-col class="filter-area" cols="7">
            <v-row>
              <VCol cols="6">
                <VCombobox
                  v-model="tabledropdow"
                  multiple
                  clearable
                  chips
                  :items="categoryDatasource"
                  placeholder="Category"
                  item-title="categoryName"
                  item-value="productCategoryID"
                  @blur="onCategoryDropdownChanged"
                />
              </VCol>
              <v-col cols="4">
                <v-combobox
                  v-model="queryParams.status"
                  clearable
                  :items="statusDatasource"
                  placeholder="active"
                  item-title="title"
                  item-value="value"
                  @blur="onStatusDropdownChanged"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col class="filter-area" cols="2"
            ><VBtn
              append-icon="mdi-new-box"
              prepend-icon="mdi-plus-thick"
              class="attractive-color"
              style="position: absolute; right: 0"
              @click="onCreateEditClicked()"
            >
              <template v-slot:prepend>
                <v-icon color="success"></v-icon>
              </template>
              Add
            </VBtn></v-col
          >
        </v-row>
      </div>
      <div class="card-body">
        <!-- <VDataTable :items="tableConfig.data"></VDataTable> -->
        <VDataTable
          ref="table"
          :headers="tableConfig.headers"
          :items="tableConfig.data"
          :items-per-page="tableConfig.pagination.pageSize"
          :items-per-page-options="tableConfig.pagination.pageSizeOptions"
          :fixed-header="{
            style: { backgroundColor: 'primary', color: 'black' },
          }"
          :search="queryParams.searchText"
          items-per-page-text="quản lý sản phẩm"
        >
          <template #item.imageUrl="{ item }">
            <v-img
              v-if="
                item.value &&
                item.value.imageProduct &&
                item.value.imageProduct.length > 0
              "
              :src="item.value.imageProduct[0].imageUrl"
              alt="Hình ảnh"
              width="3rem"
              style="max-width: 100px; max-height: 100px"
            />
            <v-img
              v-else
              :src="nullproduct"
              alt="null"
              style="max-width: 100px; max-height: 100px"
            />
          </template>
          <template #item.action="{ item }">
            <VBtn
              color="#1E88E5"
              icon="mdi-pencil"
              density="compact"
              title="Edit"
              @click="onEdititem(item)"
            ></VBtn>
            {{}}
            <VBtn
              color="#F0F4C3"
              title="View"
              @click="viewData(item)"
              icon="mdi-file-find"
              density="compact"
            ></VBtn>
            {{}}
            <VBtn
              color="error"
              @click="ondeleteClick(item)"
              icon="mdi-trash-can"
              title="Delete"
              density="compact"
            ></VBtn>
          </template>
          <template #bottom>
            <VCardText class="pt-2">
              <VRow>
                <VCol lg="2" cols="3">
                  <VTextField
                    v-model="tableConfig.pagination.pageSize"
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
                    v-model="tableConfig.pagination.pageNo"
                    @click="onPageNo"
                    total-visible="5"
                    :length="tableConfig.pagination.totalPages"
                  />
                </VCol>
              </VRow>
            </VCardText>
          </template>
        </VDataTable>
      </div>
      <div class="card-footer"></div>
    </v-card>
    <addEditProduct ref="createEditDialog"> </addEditProduct>
    <deleteDialog ref="deleteDialogProduct"></deleteDialog>
  </v-card>
</template>

<style scoped>
.attractive-color {
  /* Thiết lập màu sắc hấp dẫn */
  background-color: green-lighten-1; /* Màu sắc chính */
  color: white; /* Màu chữ */
  /* Thêm các thuộc tính khác nếu cần thiết */
}
</style>

