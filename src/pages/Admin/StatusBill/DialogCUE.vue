<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import billServices from "@/services/bill.api";
import { error, log } from "console";
import ProductServices from "@/services/productServices";
import reqdata from "@/common/untilities/dataReq";

const idStatus = ref(0);
const datatable = ref({});

const loadDataTable = async (id: any) => {
  try {
    const res = await billServices.GetBillStatusID(id);
    datatable.value = res;
    console.log(datatable.value);
  } catch (error) {
    alert("Error loading categories:");
  }
};

onMounted(() => {
  loadDataTable(idStatus);
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

const showCreateEditDialog = (id?: number, isReadonly: boolean = false) => {
  showDialog.value = true;
  loading.value = true;
  idStatus.value = id;
  isEditable.value = isReadonly;
  if (!id) {
    edit.value = true;
    cardTitle.value = "Add New ";
  } else {
    loadDataTable(id);
    if (!isReadonly) {
      edit.value = true;
      cardTitle.value = "Update ";
    } else {
      edit.value = false;
      cardTitle.value = "View ";
    }
  }
};
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

const textRules = [
  (value) =>
    (value !== null && value !== undefined && value !== false) ||
    "This field is required",
  (value) => !!value || "Text is required",
  (value) => value >= 0 || " >0",
];

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString();

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1);
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
          <VRow class="mb-4"> = </VRow>

          <VRow> = </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <template v-if="title === 'Vỉew'">
          <VBtn
            color="error"
            variant="outlined"
            @click="onCloseDialogIconClicked"
          >
            Exit
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
