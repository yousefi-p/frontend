'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import TimeSlotForm from "@/components/TimeSlotForm";
import Link from "next/link";


interface Court {
    id: number;
    name: string;
}
interface TimeSlot {
    id: number;
    court: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
}

export default function ManageCourts() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [courts, setCourts] = useState<Court[]>([]);
    const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);
    const [activeTab, setActiveTab] = useState<number>(1)

    const fetchTimeslots = () => {
        API.get('timeslots/').then((res) => setTimeslots(res.data))
    }


    useEffect(() => {
        if (!loading && !user?.is_manager) {
            router.push('/');
        } else if (user?.is_manager) {
            API.get('courts/').then((res) => setCourts(res.data));
            fetchTimeslots();
        }
    }, [user, loading, router]);

    if (loading || !user?.is_manager) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5" dir="rtl">
            <h1 className="text-end">مدیریت زمین‌ها</h1>
            <div>
                <form className="form-control" action="" method="post" dir="rtl">
                    <label htmlFor="courtName">نام زمین: </label>
                    <input name="courtName" type="text" placeholder="زمین شماره ۱" />
                    <button type="submit" className="btn btn-success">ذخیره</button>
                </form>
            </div>
            <div>
                <div className="container mt-2 mb-2">
                    <ul className="list-group">
                        {courts.map((court) => (
                                <li key={court.id} className="list-group-item list-group-item-action">
                                    <Link href={`/manager/courts/${court.id.toString()}`} className="btn-link">
                                        {court.name}
                                    </Link>
                                </li>
                        ))}

                    </ul>
                </div>
                {
                    courts ? (
                        <ul className="nav nav-tabs " dir="rtl">
                            {courts.map((court) => (
                                <li id={court.id.toString()} className="nav-item" key={court.id}>

                                    {(court.id === activeTab) ? (
                                        <a href="#" className={"nav-link active"} aria-current='page' onClick={() => setActiveTab(court.id)}>
                                            {court.name}
                                        </a>

                                    ) : (

                                        <a href="#" className={"nav-link "} onClick={() => setActiveTab(court.id)}>
                                            {court.name}

                                        </a>
                                    )}
                                </li>

                            ))}
                        </ul>
                    ) : (
                        <p>زمینی وجود ندارد!</p>
                    )
                }
            </div>

        </div>
    );
}