import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./modules/themeSlice";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    theme: themeSlice
  }
});

export default store;
