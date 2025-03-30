import { createSlice } from "@reduxjs/toolkit";
import { dailyRoutePayload } from "./dailyRoutePayload";

const dailyRouteSlice = createSlice({
    name: "dailyRoute",
    initialState: {
        dailyRoutes: [],
        dailyRoute: null,
        paginateParams: dailyRoutePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.dailyRoutes = action.payload;
            return state;
        },
        update: (state, action) => {
            state.dailyRoute = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = dailyRouteSlice.actions;
export default dailyRouteSlice.reducer;
