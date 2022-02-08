import { POST_LOGIN, REFRESH } from "./types";

export const postLogin = user => ({
  type: POST_LOGIN,
  data: user,
});

export const refresh = value => ({
  type: REFRESH,
  data: value,
});
