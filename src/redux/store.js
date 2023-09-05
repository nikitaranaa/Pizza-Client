import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import UserSlice from "./slices/UserSlice";
import AdminSlice from './slices/AdminSlice'
import MenuSlice from "./slices/MenuSlice";
import { combineReducers } from "redux";
import { createCookieMiddleware, saveStateToCookie, loadStateFromCookie } from "../middlewares/cookieMiddleware";

// Combine your reducers
const rootReducer = combineReducers({
  cart: CartSlice,
  user: UserSlice,
  admin : AdminSlice,
  menu : MenuSlice
});

// Load the initial state from the cookie
const initialState = loadStateFromCookie();

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createCookieMiddleware(saveStateToCookie))
});
