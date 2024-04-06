<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import category from "@/services/categoryServices";
import { error, log } from "console";
import ProductServices from "@/services/productServices";
import reqdata from "@/common/untilities/dataReq";

const categoryDatasource = ref([]);

const loadCategory = async () => {
  try {
    const res = await category.GetAll();
    categoryDatasource.value = res;
  } catch (error) {
    alert("Error loading categories:");
  }
};

const textRules = [
  (value) =>
    (value !== null && value !== undefined && value !== false) ||
    "This field is required",
  (value) => !!value || "Text is required",
  (value) => value >= 0 || "Please enter a number greater than 0",
];

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString();

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1);
};

onMounted(() => {
  loadCategory();
});

const requestProduct = ref<IProductServicesReq>({});

const items = ref({});

const cardTitle = ref("");
const edit = ref(true);
const isEditable = ref(false);
const showDialog = ref(false);
const workingItem = ref({});
const loading = ref(false);
const emit = defineEmits(["onSaveClick"]);

const showCreateEditDialog = (query?: any, isReadonly: boolean = false) => {
  showDialog.value = true;
  loading.value = true;
  // edit.value = false;
  // //   items.value = requestProduct.value;
  // //   cardTitle.value = "Thêm sản phẩm ";
  // if (!id) {
  //   // create new
  //   edit.value = true;
  //   cardTitle.value = "Add Product";
  //   items.value = requestProduct.value;
  // } else {
  //   if (isReadonly) {
  //     // view only
  //     edit.value = false;
  //   } else {
  //     //edit
  //   }
  // }
  isEditable.value = isReadonly;
  if (!query) {
    edit.value = true;
    items.value = requestProduct.value;
    cardTitle.value = "Thêm sản phẩm ";
  } else {
    if (!isReadonly) {
      edit.value = true;
      items.value = query.value;
      cardTitle.value = "Update ";
    } else {
      edit.value = false;
      items.value = query.value;
      cardTitle.value = "View ";
    }
  }
};

// const show = (id: number, isReadonly: boolean = false) {
//   if (!id) {
//     // create new
//   } else {
//     if (isReadonly) {
//       // view only
//     }
//     else {
//       //edit
//     }
//   }
// }
const onSaveClick = async () => {
  try {
    if (cardTitle.value === "Update ") {
      requestProduct.value = reqdata.dataRequest(items.value);
      await ProductServices.update(items.value.productID, requestProduct.value);
    } else {
      console.log("tạo mới");
    }
  } catch {
    console.log("err");
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
        <v-spacer></v-spacer>
        <!-- Sử dụng v-spacer để tạo khoảng cách giữa title và nút close -->
        <!-- <v-btn icon @click="closeCard">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </VCardTitle>
      <VCardText>
        <VContainer>
          <VRow class="mb-4">
            <VCol cols="3">
              <AppSelect
                v-model="items.categoryID"
                chips
                :readonly="!edit"
                :items="categoryDatasource"
                label="Category"
                item-title="categoryName"
                item-value="productCategoryID"
              />
            </VCol>
            <VSwitch
              v-model="items.isNew"
              :readonly="!edit"
              :label="capitalizedLabel(items.isNew ? items.isNew : false)"
            />
            <VSwitch
              v-model="items.sale"
              :readonly="!edit"
              :label="capitalizedLabel(items.sale ? items.sale : false)"
            />
            <v-text-field
              v-if="items.sale"
              :readonly="!edit"
              label="%"
              :model-value="items.priceSale"
            />
          </VRow>
          <v-text-field
            v-model="items.product_Name"
            label="Tên Sản phẩm"
            :readonly="!edit"
            class="mb-4"
            :clearable="edit"
          ></v-text-field>
          <v-text-field
            v-model="items.productDescription"
            label="Giới thiệu"
            class="mb-4"
            :clearable="edit"
            :readonly="!edit"
          ></v-text-field>
          <v-text-field
            label="Đơn giá $"
            type="number"
            class="mb-4"
            :readonly="!edit"
            :clearable="edit"
            required
            :rules="textRules"
            v-model="items.price"
          />
          <v-text-field
            label="Số Lượng"
            type="number"
            class="mb-4"
            :readonly="!edit"
            :clearable="edit"
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
            <VCol cols="3"
              ><v-file-input v-if="edit" v-model="files"></v-file-input></VCol
          ></VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <template v-if="!edit">
          <VBtn
            color="error"
            variant="outlined"
            @click="onCloseDialogIconClicked"
          >
            Close
          </VBtn>
        </template>
        <template v-else
          ><VBtn
            color="error"
            variant="outlined"
            @click="onCloseDialogIconClicked"
          >
            Cancel
          </VBtn>

          <VBtn color="success" variant="elevated" @click="onSaveClick">
            Save
          </VBtn>
        </template>
      </VCardActions></v-card
    >
  </v-dialog>
</template>
