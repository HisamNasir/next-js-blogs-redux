import { configureStore } from '@reduxjs/toolkit';
import UserReducer from "../redux/features/userSlice";

const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

export default store;