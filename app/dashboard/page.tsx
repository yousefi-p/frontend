'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LogoutButtun from "@/components/logout"
import API from "@/lib/api"

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<{ phone_number: string}| null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            router.push('/login')
        }
    }, [])

    API.get('user-profile/')
        .then((res) => {
            setUser(res.data)
        })
        .catch(() => {
            router.push('/login')
        })

    return (
        <div className="container mt-5">
            <h1>داشبورد کاربر</h1>
            {user ? (
                <>
                <p>{user.phone_number}</p>
            <LogoutButtun />

                </>
            ) : (
                <p>loading....</p>
            )}
            <p>شما وارد شده‌اید 🎾</p>
        </div>
    )
}