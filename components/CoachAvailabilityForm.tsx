'use client'

import { useState, useEffect } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import API from '@/lib/api'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'

interface TimeSlot {
  id: number
  name: string
}

export default function CoachAvailabilityForm({ coachId }: { coachId: number }) {
  const [dates, setDates] = useState<DateObject[]>([])
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([])
  const [slots, setSlots] = useState<TimeSlot[]>([])

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await API.get('courts/availability/')
        setSlots(response.data)
      } catch (error) {
        console.error('Error fetching time slots:', error)
      }
    }

    fetchSlots()
  }, [])

  const submit = async () => {
    const payload = dates.map((d) => ({
      date: d.format('YYYY-MM-DD'),
      slots: selectedSlotIds,
    }))
    await API.post(`coaches/${coachId}/availability/`, { items: payload })
  }

  const today = new DateObject({ calendar: persian })
  const maxDate = new DateObject({ calendar: persian }).add(6, 'days')

  return (
    <div dir="rtl" className="container mt-5">
      <h3>انتخاب روزها (تا ۷ روز آینده)</h3>
      <DatePicker
        locale={persian_fa}
        calendar={persian}
        value={dates}
        multiple
        onChange={setDates}
        format="YYYY/MM/DD"
        minDate={today}
        maxDate={maxDate}
      />

      <h3 className="mt-4">انتخاب زمان‌ها</h3>
      {slots.map(slot => (
        <div key={slot.id} className="form-check">
          <input
            type="checkbox"
            id={`slot-${slot.id}`}
            className="form-check-input"
            onChange={() =>
              setSelectedSlotIds((prev) =>
                prev.includes(slot.id)
                  ? prev.filter((i) => i !== slot.id)
                  : [...prev, slot.id]
              )
            }
          />
          <label className="form-check-label" htmlFor={`slot-${slot.id}`}>
            {slot.name}
          </label>
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={submit}>
        ثبت زمان‌های خالی
      </button>
    </div>
  )
}
