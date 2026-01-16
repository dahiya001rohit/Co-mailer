import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtactedRoute = ( { children } ) => {
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to = '/login' />

    try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        const now = Math.floor(Date.now() / 1000)
        if (payload.exp < now) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
    return children
}

export default ProtactedRoute
