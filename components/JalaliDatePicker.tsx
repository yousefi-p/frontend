// components/JalaliDateInput.tsx

'use client'

import { useState } from 'react'
import DatePicker from 'react-multi-date-picker'



export default function JalaliDatePicker(onChange: Date) {
  const [jalaliDate, setJalaliDate] = useState(new Date())


  return (
    <DatePicker
      value={jalaliDate}
      onChange={(dateObj) => {
        if (dateObj) {
          setJalaliDate(dateObj.toDate());
        } else {
          setJalaliDate(new Date());
        }
      }}
    />
  )
}
