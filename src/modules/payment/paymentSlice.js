import { createSlice } from "@reduxjs/toolkit";
import { paymentPayload } from "./paymentPayload";

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        payments: [],
        payment: null,
        paginateParams: paymentPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.payments = action.payload;
            return state;
        },
        update: (state, action) => {
            state.payment = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = paymentSlice.actions;
export default paymentSlice.reducer;
