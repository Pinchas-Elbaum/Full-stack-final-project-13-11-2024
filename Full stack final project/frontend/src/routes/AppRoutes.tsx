import { Route, Routes } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Register from "../appComponents/Register"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage  />} />
        </Routes>
    )
}