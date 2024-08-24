import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logoutAction } = authSlice.actions;
export default authSlice.reducer;
