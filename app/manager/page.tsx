'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react'
import API from '@/lib/api';
import DataBox from '@/components/DataBox';

export default function ManagerDashboard() {
    const [courtsNumber, setCourtsNumber ] = useState<number>()
    const [coachNumber, setCoachNumber ] = useState<number>()

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
                <DataBox data={courtsNumber} name='courts' faName="زمین"message='زمین تعریف نشده است.'/>
                <DataBox data={coachNumber} name='coaches' faName="مربی"message='مربی تعریف نشده است.'/>

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