<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import category from "@/services/categoryServices";
import { getCurrentInstance } from "vue";
import accountservices from "@/services/account.api";
import { log } from "console";
import snackbar from "@/SnackBar.vue";

const instance = getCurrentInstance();

const ItemAccount = ref({});

const cardTitle = ref("Account-Setting");
const showDialog = ref(false);
const emit = defineEmits(["onSaveClick"]);

const loadAccount = async () => {
  const res = await accountservices.GetByID();
  console.log(res?.data.date_Create);
};

onMounted(() => {
  loadAccount();
});

// const showDeleteDialog = (query?: any) => {
//   item.value = query;
//   // item.value = query.value;
//   // console.log(item.value.productID);
//   cardTitle.value = "Account_Setting";
//   showDialog.value = true;
// };

// const ondeleteClick = async () => {
//   const res = await productServices.DeleteProduct(item.value.productID);
//   instance?.refs.snackbarvisible.showsnackbar(res);
// };

// const onCloseDialogIconClicked = () => {
//   showDialog.value = false;
//   item.value = [];
// };

// defineExpose({
//   showDeleteDialog,
// });
</script>
<template>
  <VCard
    ><VCardTitle>
      <span class="headline">
        {{ cardTitle }}
      </span>
    </VCardTitle>
    <VCardText>
      <VContainer>
        <v-card-text class="red-text"
          >Bạn có chắc chắn muốn xóa sản phẩm này không?
        </v-card-text>
      </VContainer>
    </VCardText>
    <VCardActions>
      <VSpacer />

      <VBtn color="error" variant="outlined" @click="onCloseDialogIconClicked">
        Cancel
      </VBtn>

      <VBtn color="success" variant="elevated" @click="ondeleteClick">
        Save
      </VBtn>
    </VCardActions></VCard
  >
  <snack-bar ref="snackbarvisible"></snack-bar>
</template>

<style scoped>
.red-text {
  color: red;
  font-size: 2em;
}
</style>