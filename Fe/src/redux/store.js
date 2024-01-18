import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import typeReducer from './typeSlice';

// configureStore方法创建数据仓库
export default configureStore({
    reducer: {
        user: userReducer,
        type: typeReducer,
    },
});
