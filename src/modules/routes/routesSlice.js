import { createSlice } from "@reduxjs/toolkit";
import { routesPayload } from "./routesPayload";

const routesSlice = createSlice({
    name: "routes",
    initialState: {
        routess: [],
        routesData: null,
        paginateParams: routesPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.routess = action.payload;
            return state;
        },
        update: (state, action) => {
            state.routesData = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = routesSlice.actions;
export default routesSlice.reducer;
