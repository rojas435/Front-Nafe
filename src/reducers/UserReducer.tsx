import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string | null;
    name: string | null;
    email: string | null;
    token: string | null;
}

const initialState: UserState = {
    username: null,
    name: null,
    email: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => action.payload,
        logout: (state) => {
            state.username = null;
            state.name = null;
            state.email = null;
            state.token = null;
        }
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
