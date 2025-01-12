import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // ou "dark"
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload.theme,
      };
    },
  },
});

export const { changeTheme } = uiSlice.actions;

export default uiSlice.reducer;
