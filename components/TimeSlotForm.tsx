'use client';

import { useState } from 'react';
import API from '@/lib/api';
import DatePicker from 'react-multi-date-picker';
import 'react-datepicker/dist/react-datepicker.css';
import type{Value} from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import moment from 'jalali-moment';

interface TimeSlotFormProps {
  courts: { id: number; name: string }[];
  onTimeSlotCreated: () => void;
}



export default function TimeSlotForm({ courts, onTimeSlotCreated }: TimeSlotFormProps) {
  const [court, setCourt] = useState<number | ''>('');
  const [startTime, setStartTime] = useState<Value>(new Date);
  const [endTime, setEndTime] = useState<Value>(new Date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!court || !startTime || !endTime) {
      alert('Please fill all fields');
      return;
    }
    try {
      await API.post('timeslots/', {
        court,
        start_time: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        end_time: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
      });
      onTimeSlotCreated();
      setCourt('');
      setStartTime(null);
      setEndTime(null);
    } catch (error) {
      console.error('Failed to create timeslot', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-4">
      <div className="card-header">
        <h3>افزودن سانس جدید</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="court" className="form-label">زمین</label>
          <select
            id="court"
            className="form-control"
            value={court}
            onChange={(e) => setCourt(Number(e.target.value))}
          >
            <option value="" disabled>انتخاب کنید</option>
            {courts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="start_time" className="form-label">زمان شروع</label>
          <DatePicker
            onChange={setStartTime}
            calendar={persian}
            locale={persian_fa}
            calendarPosition='bottom-right'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="end_time" className="form-label">زمان پایان</label>
          <DatePicker
            onChange={setEndTime}
            calendar={persian}
            locale={persian_fa}
            calendarPosition='bottom-right'
          />
        </div>
        <button type="submit" className="btn btn-primary">افزودن</button>
      </div>
    </form>
  );
}
