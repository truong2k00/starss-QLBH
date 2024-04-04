<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import category from "@/services/categoryServices";
import { log } from "console";

const categoryDatasource = ref([]);

const loadCategory = async () => {
  try {
    const res = await category.GetAll();
    categoryDatasource.value = res;
    // Gán dữ liệu vào biến tham chiếu
    // categoryDatasource.value = res.map((item:) => {
    //   return {
    //     title: item.categoryName,
    //     value: item.productCategoryID,
    //   };
    // }); // Kiểm tra dữ liệu đã được gán vào biến tham chiếu
  } catch (error) {
    alert("Error loading categories:");
  }
};

onMounted(() => {
  loadCategory();
});

const files: FilesReq = ref<FilesReq>([]);

const requestProduct: IProductServicesReq = ref<IProductServicesReq>({});

const items = ref({});

const cardTitle = ref("");
const edit = ref(true);
const showDialog = ref(false);
const workingItem = ref({});
const loading = ref(false);
const emit = defineEmits(["onSaveClick"]);

const showCreateEditDialog = (query?: any) => {
  showDialog.value = true;
  loading.value = true;
  if (!query) {
    edit.value = false;
    items.value = requestProduct.value;
    cardTitle.value = "Thêm sản phẩm ";
  } else {
    edit.value = true;
    items.value = query.value;
    cardTitle.value = "Update ";
  }
};

const onSaveClick = () => {
  console.log("sss");

  if (edit) {
    requestProduct.value = { ...items };
    console.log(requestProduct.value);
  }
};

defineExpose({
  showCreateEditDialog,
});

const icon = ref([
  {
    new: {
      icon: "mdi-plus-thick",
      color: "green darken-1",
    },
  },
  {
    edit: {
      icon: "mdi-pencil",
      color: "",
    },
  },
]);

const sale = ref(false);

const onCloseDialogIconClicked = () => {
  workingItem.value = {};
  showDialog.value = false;
};
</script>

<template>
  <v-dialog
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
    width="700"
    :title="cardTitle"
  >
    <v-card
      ><VCardTitle>
        <span class="headline">
          {{ cardTitle }}
        </span>
      </VCardTitle>
      <VCardText>
        <VContainer>
          <VRow class="mb-4">
            <VCol cols="3">
              <AppSelect
                v-model="items.categoryID"
                chips
                :items="categoryDatasource"
                label="Category"
                item-title="categoryName"
                item-value="productCategoryID"
              />
            </VCol>
            <VCol cols="3">
              <VCheckbox label="new product" />
            </VCol>
            <VCol cols="3">
              <VCheckbox v-model="items.sale" label="Sale" />
            </VCol>
            <VCol cols="3">
              <v-text-field
                v-if="items.sale"
                label="%"
                :model-value="items.priceSale"
              />
            </VCol>
          </VRow>
          <v-text-field
            v-model="items.product_Name"
            label="Tên Sản phẩm"
            class="mb-4"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="items.productDescription"
            label="Giới thiệu"
            class="mb-4"
            clearable
          ></v-text-field>
          <v-text-field
            label="Đơn giá $"
            type="number"
            class="mb-4"
            clearable
            v-model="items.price"
          />
          <v-text-field
            label="Số Lượng"
            type="number"
            class="mb-4"
            clearable
            v-model="items.quantity"
          />
          <VRow>
            <VCol cols="3">
              <v-carousel
                :continuous="false"
                :show-arrows="false"
                height="100%"
                width="100%"
              >
                <VCarousel-item
                  height="100%"
                  width="100%"
                  v-for="(item, i) in items.imageProduct"
                  :key="i"
                  :src="item.imageUrl"
                  cover
                ></VCarousel-item>
              </v-carousel>
              <!-- <VRow>
                <VCol cols="3" v-for="item in items.imageProduct">
                  <VImg :src="item.imageUrl"></VImg>
                </VCol>
              </VRow> -->
            </VCol>
            <VCol cols="6"></VCol>
            <VCol cols="3"><v-file-input v-model="files"></v-file-input></VCol
          ></VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="onCloseDialogIconClicked"
        >
          Cancel
        </VBtn>

        <VBtn color="success" variant="elevated" @click="onSaveClick">
          Save
        </VBtn>
      </VCardActions></v-card
    >
  </v-dialog>
</template>
