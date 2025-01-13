import { createSlice } from "@reduxjs/toolkit";
import { sroutesPayload } from "./sroutesPayload";

const sroutesSlice = createSlice({
    name: "sroutes",
    initialState: {
        sroutess: [],
        sroutesData: null,
        paginateParams: sroutesPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.sroutess = action.payload;
            return state;
        },
        update: (state, action) => {
            state.sroutesData = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = sroutesSlice.actions;
export default sroutesSlice.reducer;
