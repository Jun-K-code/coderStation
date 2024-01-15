import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// configureStore方法创建数据仓库
export default configureStore({
    reducer: {
        user: userReducer,
    },
});
