<script setup lang="ts">
import { VForm } from "vuetify/components/VForm";

import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";

import localStorageKey from "@/common/constants/LocalStorageKey";
import setAuthHeader from "@/plugins/setAuthHeader";
import authservices from "@/services/auth/login";
import { AuthMessage } from "@/common/constants/auth";
import { ITokenRes } from "@/interfaces/res/IToken.res";
import { error } from "console";

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);

const isPasswordVisible = ref(false);

const err = ref({
  errcheck: false,
  errmessage: "",
});

onMounted(() => {
  localStorage.removeItem(localStorageKey.ACCESS_TOKEN);
  localStorage.removeItem(localStorageKey.REFRESH_TOKEN);
  localStorage.removeItem(localStorageKey.USER_DATA);
});

const base = import.meta.env.BASE_URL;
const route = useRoute();
const router = useRouter();

const refVForm = ref<VForm>();
const userName = ref("admin@demo.com");
const password = ref("admin");
const rememberMe = ref(false);
const loginUser = async () => {
  try {
    // Gán dữ liệu vào biến tham chiếu
    const res = await authservices.login(userName.value, password.value);
    if (res?.accessToken) {
      alert(AuthMessage.LoginSuccess);
      setAuthHeader(res.accessToken);
      localStorage.setItem(localStorageKey.REFRESH_TOKEN, res.refreshToken);
      localStorage.setItem(localStorageKey.ACCESS_TOKEN, res.accessToken);
      localStorage.setItem(
        localStorageKey.USER_DATA,
        JSON.stringify({
          user: userName.value,
          role: res.roleName,
          date: Date.now(),
        })
      );
      router.replace(route.query.to ? String(route.query.to) : "Admin/Product");
    } else {
      alert("ssss");
      err.value.errmessage = AuthMessage.LoginFail;
      err.value.errcheck = true;
      // Xử lý thông báo lỗi hoặc các xử lý khác
    }
  } catch (error) {
    err.value.errmessage = AuthMessage.LoginError;
    err.value.errcheck = true;
  }
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />

          <h5 class="text-h5 mb-1">
            Welcome to
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>

          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
        <VCardText v-if="err.errcheck" class="front-bold">{{
          err.errmessage
        }}</VCardText>

        <VCardText>
          <VAlert color="primary" variant="tonal">
            <p class="text-caption mb-2">
              Admin Email: <strong>admin@demo.com</strong> / Pass:
              <strong>admin</strong>
            </p>

            <p class="text-caption mb-0">
              Client Email: <strong>client@demo.com</strong> / Pass:
              <strong>client</strong>
            </p>
          </VAlert>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="userName"
                  label="User Name or Email"
                  type="email"
                  autofocus
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  @change="password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  @keydown.enter="loginUser"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
                >
                  <VCheckbox v-model="rememberMe" label="Remember me" />
                  <a class="text-primary ms-2 mb-1" href="#">
                    Forgot Password?
                  </a>
                </div>

                <VBtn @click="loginUser" block type="submit"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>New on our platform?</span>

                <a class="text-primary ms-2" href="#"> Create an account </a>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />

                <span class="mx-4">or</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
