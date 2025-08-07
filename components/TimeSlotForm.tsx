'use client';

import { useState } from 'react';
import API from '@/lib/api';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import {faIR} from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'jalali-moment'
import JalaliDateInput from './JalaliDateInput';

interface TimeSlotFormProps {
  courts: { id: number; name: string }[];
  onTimeSlotCreated: () => void;
}

registerLocale('fa', faIR);
setDefaultLocale('fa');

export default function TimeSlotForm({ courts, onTimeSlotCreated }: TimeSlotFormProps) {
  const [court, setCourt] = useState<number | ''>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

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
            selected={startTime}
            onChange={(date: Date | null) => setStartTime(date)}
            showTimeSelect
            dateFormat="Pp"
            calendar="persian"
            locale="fa"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="end_time" className="form-label">زمان پایان</label>
          <JalaliDateInput onChange={function (gDate: string): void {
            throw new Error('Function not implemented.');
          } } />
          <DatePicker
            selected={endTime}
            onChange={(date: Date | null) => setEndTime(date)}
            showTimeSelect
            dateFormat="Pp"
            calendar="persian"
            locale="fa"
          />
        </div>
        <button type="submit" className="btn btn-primary">افزودن</button>
      </div>
    </form>
  );
}
