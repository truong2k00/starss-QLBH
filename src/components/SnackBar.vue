<script lang="ts" setup>
const message = ref("");
const isSnackbarVisible = ref(false);
const showsnackbar = (param: string) => {
  message.value = param;
  isSnackbarVisible.value = true;
};
defineExpose({
  showsnackbar,
});
</script>

<template>
  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisible" :timeout="2000">
    {{ message }}
  </VSnackbar>
</template>
