import { createSlice } from "@reduxjs/toolkit";
import { contactPayload } from "./contactPayload";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: [],
        contact: null,
        paginateParams: contactPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.contacts = action.payload;
            return state;
        },
        update: (state, action) => {
            state.contact = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = contactSlice.actions;
export default contactSlice.reducer;
