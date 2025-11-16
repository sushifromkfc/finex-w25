"use client"

import { useMemo, useState } from "react"

import { Transaction } from "@/lib/types"

interface Props {
  transactions: Transaction[]
}

export default function Calendar({ transactions }: Props) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string>("")

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else setCurrentMonth((m) => m - 1)
  }

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else setCurrentMonth((m) => m + 1)
  }

  const spendingMap = useMemo(() => {
    const map: Record<string, { total: number; items: Transaction[] }> = {}
    transactions.forEach((tx) => {
      const key = (tx.date || "").split("T")[0]
      if (!map[key]) {
        map[key] = { total: 0, items: [] }
      }
      map[key].total += Number(tx.amount || 0)
      map[key].items.push(tx)
    })
    return map
  }, [transactions])

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Spending calendar</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goPrevMonth}
          className="px-3 py-1 rounded-lg bg-white/80 border border-sky-200 text-slate-700 hover:bg-sky-50 backdrop-blur-xl shadow-sm"
        >
          ← Previous
        </button>

        <h2 className="text-xl font-semibold text-slate-900">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          onClick={goNextMonth}
          className="px-3 py-1 rounded-lg bg-white/80 border border-sky-200 text-slate-700 hover:bg-sky-50 backdrop-blur-xl shadow-sm"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 bg-white/85 backdrop-blur-xl border border-white/70 p-4 rounded-2xl shadow-md">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-slate-500 text-xs mb-2 font-medium">
            {day}
          </div>
        ))}

        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={i} />
          ))}

        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const date = i + 1
            const key = formatDate(currentYear, currentMonth, date)
            const amount = spendingMap[key]?.total || 0
            const isSelected = selectedDate === key

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(key)}
                className={`
                  h-20 flex flex-col justify-between p-2 rounded-xl border transition 
                  ${
                    isSelected
                      ? "bg-sky-200/70 border-sky-400 shadow-md"
                      : "bg-white/60 border-sky-200 hover:border-sky-400/50"
                  }
                  backdrop-blur-xl
                `}
              >
                <span className="text-xs text-slate-700">{date}</span>

                {amount > 0 && (
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    ${amount.toFixed(0)}
                  </span>
                )}
              </button>
            )
          })}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 bg-white/80 border border-white/70 rounded-2xl shadow-md backdrop-blur-xl">
          <p className="text-sm text-slate-700 mb-3">
            Transactions on <span className="font-semibold">{selectedDate}</span>
          </p>
          {spendingMap[selectedDate]?.items?.length ? (
            <div className="space-y-2">
              {spendingMap[selectedDate].items.map((tx) => (
                <div
                  key={`${tx.id}-${tx.date}`}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{tx.name}</p>
                    <p className="text-[11px] text-slate-500">{tx.category || "Uncategorized"}</p>
                  </div>
                  <p className="text-slate-700">${Number(tx.amount).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No transactions on this date.</p>
          )}
        </div>
      )}
    </div>
  )
}
