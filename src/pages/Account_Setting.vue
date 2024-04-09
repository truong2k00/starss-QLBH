<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import category from "@/services/categoryServices";
import { getCurrentInstance } from "vue";
import accountservices from "@/services/account.api";
import { log } from "console";
import AccountSettingsAccount from "./components/AccountSettingsAccount.vue";
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
</script>
<template>
  <VCard
    ><VCardTitle>
      <span class="headline">
        {{ cardTitle }}
      </span>
    </VCardTitle>
    <VCardText>
      <VWindow
        v-model="activeTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem value="account">
          <account-settings-account />
        </VWindowItem>
      </VWindow>
    </VCardText>
    <VCardActions> <VSpacer /> </VCardActions
  ></VCard>
  <snack-bar ref="snackbarvisible"></snack-bar>
</template>

<style scoped>
.red-text {
  color: red;
  font-size: 2em;
}
</style>