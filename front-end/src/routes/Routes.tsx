import React from 'react'

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import RequireAuth from '../components/RequireAuth'
import Login from '../pages/Login'

const routes = createRoutesFromElements(
    <Route path="/" >
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
        </Route>
    </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })