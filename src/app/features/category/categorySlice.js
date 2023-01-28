import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: { cat: 0 },
    reducers: {
        setCategory: (state, action) => {
            const { cat } = action.payload;
            state.cat = cat;
        },
    },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
