import { createSlice } from "@reduxjs/toolkit";
import { vehiclesTypePayload } from "./vehiclesTypePayload";

const vehiclesTypeSlice = createSlice({
    name: "vehiclesType",
    initialState: {
        vehiclesTypes: [],
        vehiclesType: null,
        paginateParams: vehiclesTypePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.vehiclesTypes = action.payload;
            return state;
        },
        update: (state, action) => {
            state.vehiclesType = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = vehiclesTypeSlice.actions;
export default vehiclesTypeSlice.reducer;
