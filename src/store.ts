import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
