import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [appToken, setAppToken] = useState(localStorage.getItem('appToken'))


    useEffect(() => {
        const t = localStorage.getItem('token')
        if (!t) return
        setToken(t)
        try {
            const payload = JSON.parse(atob(t.split('.')[1]))
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem('token')
                alert('Session expired. Please log in again.')
                window.location.href = '/login'
                return
            }
            setUser(payload)
        } catch (error) {
            localStorage.removeItem('token')
            alert('Invalid session. Please log in again.')
            window.location.href = '/login'
        }

        // Check appToken expiry
        const appT = localStorage.getItem('appToken')
        if (appT) {
            try {
                const payload = JSON.parse(atob(appT.split('.')[1]))
                if (payload.exp * 1000 < Date.now()) {
                    localStorage.removeItem('appToken')
                    alert('App Password expired. Please re-enter your app password.')
                    window.location.href = '/login'
                }
            } catch (err) {
                localStorage.removeItem('appToken')
                alert('Invalid App Password session. Please re-enter your app password.')
                window.location.href = '/login'
            }
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