'use client'

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function LogoutButtun() {
    const router = useRouter()
    const { logout: authLogout } = useAuth();

    const logout = () => {
        authLogout();
        router.push('/');
    }
    return (
        <button onClick={logout} className="dropdown-item">
            خروج
        </button>
    )
}
