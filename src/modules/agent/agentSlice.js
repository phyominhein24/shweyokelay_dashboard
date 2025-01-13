import { createSlice } from "@reduxjs/toolkit";
import { agentPayload } from "./agentPayload";

const agentSlice = createSlice({
    name: "agent",
    initialState: {
        agents: [],
        agent: null,
        paginateParams: agentPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.agents = action.payload;
            return state;
        },
        update: (state, action) => {
            state.agent = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = agentSlice.actions;
export default agentSlice.reducer;
