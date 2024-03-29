import { ITokenRes } from "@/interfaces/res/IToken.res";
import axios from "@/plugins/axios";

import localStorageKey from "@/common/constants/LocalStorageKey";
import setAuthHeader from "@/plugins/setAuthHeader";

const CONTROLLER_NAME = "auth";
const CONTROLLER_DELETE = "Delete";

const route = useRoute();
const router = useRouter();

const login = async (
  email: string,
  password: string
): Promise<ITokenRes | null> => {
  try {
    const res = await axios.post(`${CONTROLLER_NAME}/login`, {
      userName: email,
      password: password,
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

const refreshToken = async (
  refreshToken: string
): Promise<ITokenRes | null> => {
  try {
    const res = await axios.post(
      `${CONTROLLER_NAME}/RenewToken?token=${refreshToken}`
    );

    setAuthHeader(res.data.accessToken);
    localStorage.setItem(localStorageKey.REFRESH_TOKEN, res.data.refreshToken); // Save new Refresh Token to
    localStorage.setItem(localStorageKey.ACCESS_TOKEN, res.data.accessToken);
    const existingUserData = JSON.parse(
      localStorage.getItem(localStorageKey.USER_DATA)
    );
    console.log(existingUserData);
    localStorage.setItem(
      localStorageKey.USER_DATA,
      JSON.stringify(existingUserData)
    );
    return res.data;
  } catch (err) {
    router.replace(route.query.to ? String(route.query.to) : "login");
  }
};

const authservices = {
  login,
  refreshToken,
};

export default authservices;
