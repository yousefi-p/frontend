'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import TimeSlotForm from '@/components/TimeSlotForm';
import moment from 'jalali-moment';

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

export default function ManagerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courts, setCourts] = useState<Court[]>([]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);

  const fetchTimeslots = () => {
    API.get('timeslots/').then((res) => setTimeslots(res.data));
  };

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
    <div className="container">
      <h1 className="my-4">پنل مدیریت</h1>
      
      <TimeSlotForm courts={courts} onTimeSlotCreated={fetchTimeslots} />

      <div className="card mb-4">
        <div className="card-header">
          <h2>زمین‌ها</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {courts.map((court) => (
              <li key={court.id} className="list-group-item">{court.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>سانس‌ها</h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>زمین</th>
                <th>زمان شروع</th>
                <th>زمان پایان</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {timeslots.map((slot) => (
                <tr key={slot.id}>
                  <td>{courts.find(c => c.id === slot.court)?.name}</td>
                  <td>{moment(slot.start_time).locale('fa').format('YYYY/MM/DD HH:mm')}</td>
                  <td>{moment(slot.end_time).locale('fa').format('YYYY/MM/DD HH:mm')}</td>
                  <td>{slot.is_available ? 'موجود' : 'رزرو شده'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
