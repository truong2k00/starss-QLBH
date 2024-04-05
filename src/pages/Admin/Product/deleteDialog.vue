<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import category from "@/services/categoryServices";
import { getCurrentInstance } from "vue";
import productServices from "@/services/productServices";
import { log } from "console";
import snackbar from "@/components/SnackBar.vue";

const instance = getCurrentInstance();

const item = ref({});

const cardTitle = ref("");
const showDialog = ref(false);
const emit = defineEmits(["onSaveClick"]);

const showDeleteDialog = (query?: any) => {
  console.log(query);
  item.value = query;
  // item.value = query.value;
  // console.log(item.value.productID);
  cardTitle.value = "Delete";
  showDialog.value = true;
};

const ondeleteClick = async () => {
  const res = await productServices.DeleteProduct(item.value.productID);
  instance?.refs.snackbarvisible.showsnackbar(res);
};

const onCloseDialogIconClicked = () => {
  showDialog.value = false;
  item.value = [];
};

defineExpose({
  showDeleteDialog,
});
</script>
<template>
  <v-dialog
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
    width="700"
    :title="cardTitle"
    ><VCard
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

        <VBtn
          color="error"
          variant="outlined"
          @click="onCloseDialogIconClicked"
        >
          Cancel
        </VBtn>

        <VBtn color="success" variant="elevated" @click="ondeleteClick">
          Save
        </VBtn>
      </VCardActions></VCard
    ></v-dialog
  >
  <snack-bar ref="snackbarvisible"></snack-bar>
</template>

<style scoped>
.red-text {
  color: red;
  font-size: 2em;
}
</style>