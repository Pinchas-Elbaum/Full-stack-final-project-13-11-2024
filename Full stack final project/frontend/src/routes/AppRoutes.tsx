import { Route, Routes } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Register from "../appComponents/Register"
import Login from "../appComponents/Login"
import Home from "../appComponents/Home"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage  />} />
        </Routes>
    )
}