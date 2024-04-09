<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import billServices from "@/services/bill.api";
import { error, log } from "console";
import status from "@/common/untilities/statusVariant";
import ProductServices from "@/services/productServices";
import reqdata from "@/common/untilities/dataReq";
import DataTableHelper from "@/common/untilities/dataTableHelper";

const idStatus = ref(0);
const datareq = ref({});

const loadData = async (id?: any) => {
  try {
    const res = await billServices.GetByID(id);

    return res?.data;
  } catch (error) {
    alert("Error loading categories:");
    return null;
  }
};

const cardTitle = ref("");
const edit = ref(true);
const isEditable = ref(false);
const showDialog = ref(false);
const workingItem = ref({});
const loading = ref(false);

const statusVarianID = (id) => {
  statusVariants.value.color = status.resolveStatusVariant(id)?.color;
  statusVariants.value.text = status.resolveStatusVariant(id)?.text;
};
// const emit = defineEmits(["onSaveClick"]);
const statusVariants = ref({
  color: "red",
  text: "red",
});

const showCreateEditDialog = async (
  data?: any,
  isReadonly: boolean = false
) => {
  showDialog.value = true;
  loading.value = true;
  idStatus.value = data.statusBillId;
  isEditable.value = isReadonly;

  if (!data) {
    edit.value = true;
    cardTitle.value = "Add New ";
  } else {
    workingItem.value = await loadData(data.billId);
    statusVarianID(workingItem.value.statusBillID);

    if (!isReadonly) {
      edit.value = true;
      cardTitle.value = "Update";
    } else {
      edit.value = false;
      cardTitle.value = "View";
    }
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
          <VTextField
            class="mb-4"
            label="Mã hóa đơn"
            :readonly="!edit"
            :clearable="edit"
            required
            v-model="workingItem.address"
          ></VTextField>
          <VTextField
            label="Tài khoản tạo"
            class="mb-4"
            :readonly="!edit"
            :clearable="edit"
            required
            v-model="workingItem.userName"
          ></VTextField>
          <VTextField
            label="Thời gian tạo"
            class="mb-4"
            :readonly="!edit"
            :clearable="edit"
            required
            v-model="workingItem.date_Create"
          ></VTextField>
          <VTextField
            label="Thành Tiền"
            class="mb-4"
            :readonly="!edit"
            :clearable="edit"
            required
            v-model="workingItem.totalPrice"
          ></VTextField>
          <VRow>
            <VCol cols="3"> <AppSelect /></VCol>
            <VSpacer />
            <VChip
              :color="statusVariants.color"
              class="font-weight-medium"
              size="small"
            >
              {{ statusVariants.text }}
            </VChip>
          </VRow>
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
