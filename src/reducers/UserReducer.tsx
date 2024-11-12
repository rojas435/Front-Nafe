// ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// cambiar a LO NECESARIO DE routine u otro caso de uso  - APP.TSX YA FUE MODIFICADO PARA SOPORTAR ESTA CONFIGURACIÓN
interface UserState {
    username: string | null;
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
    username: null,
    name: null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_state, action: PayloadAction<UserState>) => action.payload,
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => ({
            ...state,
            ...action.payload
        })
    }
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
