import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setGlobalState } = globalSlice.actions;

export default globalSlice.reducer;
