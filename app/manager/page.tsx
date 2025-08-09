'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react'
import API from '@/lib/api';

export default function ManagerDashboard() {
    const [courtsNumber, setCourtsNumber ] = useState<Number>()
    const [coachNumber, setCoachNumber ] = useState<Number>()

    useEffect(()=>{
        API.get('court-count/').then((response)=>{
            setCourtsNumber(response.data.count)
        });

        API.get('coach-count/').then((response)=>{
            setCoachNumber(response.data.count)
        })
    },[]);

    return (
        <div className="container mt-5" dir='rtl'>
            <h1 className="text-center mb-4">پنل مدیریت</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">مدیریت زمین‌ها</h5>
                            { courtsNumber ? (
                            <>
                            <p className="card-text">تعداد کل زمین‌ها: 
                                <span className='badge text-bg-info'>{courtsNumber.toString()}</span>
                                </p>
                            <Link href="/manager/courts" className="btn btn-primary">مشاهده</Link>
                            </>
                            ) : (
                                    <p className="card-text">زمین تعریف نشده است. </p>                                
                            )
                        }
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">مدیریت مربیان</h5>
                            {
                                coachNumber ? (
                                    <>
                                        <p className="card-text">تعداد کل مربیان: 
                                            <span className='badge text-bg-info'>{coachNumber.toString()}</span>
                                            </p>
                                        <Link href="/manager/coaches" className="btn btn-primary">مشاهده</Link>
                                    </>
                                ) : (
                                    <p className="card-text">مربی تعریف نشده است. </p>
                                )
                            }

                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">رزروها</h5>
                            <p className="card-text">تعداد کل رزروها: 20</p>
                            <Link href="/manager/reservations" className="btn btn-primary">مشاهده</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}