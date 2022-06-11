import { POST_LOGIN, REFRESH, CHANGE_URL } from "./types";

export const postLogin = user => ({
  type: POST_LOGIN,
  data: user,
});

export const changeUrl = url => ({
  type: CHANGE_URL,
  data: url,
});

export const refresh = value => ({
  type: REFRESH,
  data: value,
});
