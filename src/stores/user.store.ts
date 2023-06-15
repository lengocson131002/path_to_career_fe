import { jsonParseUtil } from "@/commons/utils";
import { AccountModel } from "@/services/accounts/models";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  account: AccountModel;
}

const initialState: UserState = {
  account: jsonParseUtil(localStorage.getItem("current_user")),
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
