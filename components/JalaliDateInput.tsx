// components/JalaliDateInput.tsx
import { useState } from 'react'
import jalaali from 'jalaali-js'

export default function JalaliDateInput({ onChange }: { onChange: (gDate: string) => void }) {
  const [jalali, setJalali] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const j = e.target.value  // e.g. "1404/05/15"
    setJalali(j)
    const parts = j.split('/').map(Number)
    const g = jalaali.toGregorian(parts[0], parts[1], parts[2])
    const iso = new Date(g.gy, g.gm - 1, g.gd).toISOString().split('T')[0]
    onChange(iso)
  }

  return (
    <input
      type="text"
      className="form-control"
      placeholder="۱۴۰۴/۰۵/۱۵"
      value={jalali}
      onChange={handleChange}
    />
  )
}
