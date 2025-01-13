import { createSlice } from "@reduxjs/toolkit";
import { counterPayload } from "./counterPayload";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        counters: [],
        counter: null,
        paginateParams: counterPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.counters = action.payload;
            return state;
        },
        update: (state, action) => {
            state.counter = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = counterSlice.actions;
export default counterSlice.reducer;
