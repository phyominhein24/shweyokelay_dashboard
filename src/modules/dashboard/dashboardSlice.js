import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        total_data: [],
        chart_data: []
    },
    reducers: {
        totaldata: (state, action) => {
            state.total_data = action.payload;
            return state;
        },
        chartdata: (state, action) => {
            state.chart_data = action.payload;
            return state;
        },
    },
});

export const { totaldata, chartdata } = dashboardSlice.actions;
export default dashboardSlice.reducer;