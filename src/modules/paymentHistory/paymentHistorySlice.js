import { createSlice } from "@reduxjs/toolkit";
import { paymentHistoryPayload } from "./paymentHistoryPayload";

const paymentHistorySlice = createSlice({
    name: "paymentHistory",
    initialState: {
        paymentHistorys: [],
        paymentHistory: null,
        paginateParams: paymentHistoryPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.paymentHistorys = action.payload;
            return state;
        },
        update: (state, action) => {
            state.paymentHistory = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = paymentHistorySlice.actions;
export default paymentHistorySlice.reducer;
