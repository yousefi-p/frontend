'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import moment from 'jalali-moment';

interface Reservation {
  id: number;
  timeslot: number;
  user: number;
  coach: number;
}

interface TimeSlot {
    id: number;
    court: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }

export default function CoachPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (!loading && !user?.is_staff) {
      router.push('/');
    } else if (user?.is_staff) {
      API.get('reservations/').then((res) => {
        setReservations(res.data.filter((r: Reservation) => r.coach === user.id));
      });
      API.get('timeslots/').then((res) => setTimeslots(res.data));
    }
  }, [user, loading, router]);

  if (loading || !user?.is_staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">پنل مربی</h1>
      
      <div className="card">
        <div className="card-header">
          <h2>کلاس‌های شما</h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>زمان</th>
                <th>شاگرد</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                const timeslot = timeslots.find(t => t.id === reservation.timeslot);
                return (
                    <tr key={reservation.id}>
                    <td>{timeslot ? moment(timeslot.start_time).locale('fa').format('YYYY/MM/DD HH:mm') : ''}</td>
                    <td>{reservation.user}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
