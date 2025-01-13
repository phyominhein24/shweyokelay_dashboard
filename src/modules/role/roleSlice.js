import { createSlice } from "@reduxjs/toolkit";
import { rolePayload } from "./rolePayload";

const roleSlice = createSlice({
    name: "role",
    initialState: {
        roles: [],
        role: null,
        paginateParams: rolePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.roles = action.payload;
            return state;
        },
        update: (state, action) => {
            state.role = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = roleSlice.actions;
export default roleSlice.reducer;
