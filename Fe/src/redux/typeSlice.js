import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getType } from '../api/type';

export const getTypeList = createAsyncThunk('type/getTypeList', async () => {
    const response = await getType();
    // 填充返回的数据到状态仓库
    return response.data;
});

const typeSlice = createSlice({
    name: 'type',
    initialState: {
        typeList: [], // 存储所有的类型
        issueTypeId: 'all',
        bookTypeId: 'all',
    },
    reducers: {
        updateIssueTypeId: (state, { payload }) => {
            state.issueTypeId = payload;
        },
    },
    // 专门处理异步的 reducer
    extraReducers: (builder) => {
        // 这里就会有三种状态
        builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
            state.typeList = payload;
        });
    },
    // extraReducers: {
    //     // 这里就会有三种状态
    //     [getTypeList.fulfilled]: (state, { payload }) => {
    //         state.typeList = payload;
    //     },
    // },
});
export const { updateIssueTypeId } = typeSlice.actions;
export default typeSlice.reducer;

// export const getTypeList = async () => {
//     const response = await getType();
//     // 填充返回的数据到状态仓库
//     return response.data;
// };

// const typeSlice = createSlice({
//     name: 'type',
//     initialState: {
//         typeList: [], // 存储所有的类型
//     },
//     reducers: {
//         // 修改用户登录状态
//         changeLoginStatus: (state, { payload }) => {
//             state.typeList = payload;
//         },
//     },
// });
// export const { changeLoginStatus } = typeSlice.actions;
// export default typeSlice.reducer;
