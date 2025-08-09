'use client'

import { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import API from '@/lib/api'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

export default function CourtAvailabilityForm({ courtId }: { courtId: number }) {
  const [dates, setDates] = useState<DateObject[]>([])
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('22:00')
  const [interval, setInterval] = useState(60)

  const submit = async () => {
    const payload = {
      dates: dates.map((d) => d.format('YYYY-MM-DD')),
      start_time: startTime,
      end_time: endTime,
      interval: interval,
    }
    await API.post(`courts/${courtId}/generate-slots/`, payload)
  }

  return (
    <div dir="rtl" className="container mt-5">
      <div className="mb-3">
        <label className="form-label">انتخاب روزها</label>
        <DatePicker
          locale={persian_fa}
          calendar={persian}
          value={dates}
          multiple
          onChange={setDates}
          format="YYYY/MM/DD"
          containerClassName="w-100"
        />
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="start-time" className="form-label">
            زمان شروع
          </label>
          <input
            type="time"
            id="start-time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="end-time" className="form-label">
            زمان پایان
          </label>
          <input
            type="time"
            id="end-time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="my-3">
        <label htmlFor="interval" className="form-label">
          فاصله زمانی (دقیقه)
        </label>
        <input
          type="number"
          id="interval"
          className="form-control"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value, 10))}
          step="15"
          min="15"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={submit}>
        ایجاد سانس‌ها
      </button>
    </div>
  )
}
