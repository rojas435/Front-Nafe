// ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserReducer';

const appReducer = combineReducers({
    user: userReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;
