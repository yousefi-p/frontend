'use client'

import { useState } from "react";
import axios from "axios";
import styles from '@/app/page.module.css'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
    const [step, setStep] = useState<1 | 2>(1);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [msg, setMsg] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const sendCode = async () => {
        try {
            console.log('Sending code to:', phone);
        await axios.post('http://localhost:8000/api/send-code/', {
            phone_number: phone,
        });
        setStep(2);
        setMsg('کد ارسال شد');
        } catch (error) {
        setMsg('ارسال کد با مشکل مواجه شد');
        }
    };
    
    const verifyCode = async () => {
        try {
        await axios.post('http://localhost:8000/api/verify-code/', {
            phone_number: phone,
            code: code,
        });

        const res = await axios.post('http://localhost:8000/api/token/', {
            phone_number: phone,
            password: code,
        })

        login(res.data.access, res.data.refresh);
        setMsg('ورود موفق');
        
        router.push('/')

        } catch (error) {
        setMsg('کد اشتباه است');
        }
    };
    
    return (
        <div className={styles.formContainer}>
        <h2 className="text-center mb-4">ورود به حساب کاربری</h2>
        <label htmlFor="#phone" className="form-label">شماره تلفن همراه</label>
    
        {step === 1 ? (
            <>
            <input
                id={styles.phone}
                className="form-control"
                maxLength={11}
                required
                name="phone"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button className="btn btn-primary mt-2 animated-border" onClick={sendCode}>
                ارسال کد
            </button>
            </>
        ) : (
            <>
            <input
                id={styles.code}
                maxLength={6}
                required
                name="code"
                type="number"
                capture
                className="form-control"
                placeholder="کد تایید"
                autoFocus
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button className="btn btn-primary mt-2 animated-border" onClick={verifyCode}>
                تایید کد
            </button>
            </>
        )}
        
        {msg && <div className="alert alert-info mt-3">{msg}</div>}
        </div>
    );
}
