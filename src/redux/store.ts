import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./usersSlice";
import deleteUserReducer from "./deleteUserSlice";
import analyticsDataReducer from "./analyticsSlice";
import userFilteredValueReducer from "./userFilteredValueSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    deleteUser: deleteUserReducer,
    analytics: analyticsDataReducer,
    filtered: userFilteredValueReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
