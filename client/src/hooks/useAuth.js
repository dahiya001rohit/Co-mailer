import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)


    useEffect(() => {
        const t = localStorage.getItem('token')
        if (!t) return
        setToken(t)
        try {
            const payload = JSON.parse(atob(t.split('.')[1]))
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem('token')
                return
            }
            setUser(payload)
        } catch (error) {
            localStorage.removeItem('token')
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('appToken')
        setToken(null)
        setUser(null)
        navigate('/login')
    }

    return {
        token,
        user,
        isAuthemticated: !!token,
        logOut,
    }
}

export default useAuth