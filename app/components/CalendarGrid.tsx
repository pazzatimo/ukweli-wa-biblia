'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/sanity.image'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  startDateTime: string
  endDateTime?: string
  location?: string
  description?: any[]
  coverImage?: any
  recurring?: {
    isRecurring: boolean
    rule?: string
  }
}

interface CalendarGridProps {
  events: Event[]
}

// Helper: parse a Swahili day name to a weekday number (0 = Sunday, 1 = Monday, ...)
const dayNameToNumber = (day: string): number | null => {
  const map: Record<string, number> = {
    'jumapili': 0,
    'jumatatu': 1,
    'jumanne': 2,
    'jumatano': 3,
    'alhamisi': 4,
    'ijumaa': 5,
    'jumamosi': 6,
  }
  return map[day.toLowerCase().trim()] ?? null
}

// Parse a recurring rule string to a function that generates dates for a given month
function parseRecurrenceRule(rule: string): (year: number, month: number) => Date[] {
  // Try to detect "Kila Jumatano" or "Kila Jumapili", etc.
  const weeklyMatch = rule.match(/kila\s+(jumapili|jumatatu|jumanne|jumatano|alhamisi|ijumaa|jumamosi)/i)
  if (weeklyMatch) {
    const dayName = weeklyMatch[1]
    const dayNum = dayNameToNumber(dayName)
    if (dayNum !== null) {
      // Return a function that returns all dates in the given month matching that weekday
      return (year: number, month: number) => {
        const dates: Date[] = []
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const current = new Date(firstDay)
        // Move to the first occurrence of the target weekday
        while (current.getDay() !== dayNum) {
          current.setDate(current.getDate() + 1)
        }
        while (current <= lastDay) {
          dates.push(new Date(current))
          current.setDate(current.getDate() + 7)
        }
        return dates
      }
    }
  }

  // Try to detect "Kila mwaka" (yearly)
  const yearlyMatch = rule.match(/kila\s+mwaka/i)
  if (yearlyMatch) {
    // For yearly, we need to extract the month and day from the rule or from the event's start date.
    // We'll use the event's startDateTime to get month/day and assume it repeats every year.
    return (year: number, month: number) => {
      // This function will be called with the current year/month, but we need to know the original month/day.
      // We'll capture the original date from the event's startDateTime later.
      // Since we don't have that here, we'll return an empty array and handle yearly differently.
      return []
    }
  }

  // If no pattern matches, return a function that generates no additional dates.
  return () => []
}

// Expand recurring events within a month
function expandEventsForMonth(events: Event[], year: number, month: number): Event[] {
  const expanded: Event[] = []

  events.forEach((event) => {
    if (!event.recurring?.isRecurring || !event.recurring.rule) {
      // Non-recurring: include as-is
      expanded.push(event)
      return
    }

    const rule = event.recurring.rule
    const parser = parseRecurrenceRule(rule)
    const dates = parser(year, month)

    if (dates.length === 0) {
      // If no dates generated (e.g., yearly), we can still show the event on its original date
      // if it falls within the month.
      const originalDate = new Date(event.startDateTime)
      if (originalDate.getMonth() === month && originalDate.getFullYear() === year) {
        expanded.push(event)
      }
      return
    }

    // For each generated date, create a copy with updated startDateTime
    dates.forEach((date) => {
      // Preserve the time from the original event's startDateTime
      const originalStart = new Date(event.startDateTime)
      const newStart = new Date(date)
      newStart.setHours(originalStart.getHours(), originalStart.getMinutes(), 0, 0)

      // Preserve the duration if there is an endDateTime
      let newEnd = null
      if (event.endDateTime) {
        const originalEnd = new Date(event.endDateTime)
        const duration = originalEnd.getTime() - originalStart.getTime()
        newEnd = new Date(newStart.getTime() + duration)
      }

      expanded.push({
        ...event,
        startDateTime: newStart.toISOString(),
        endDateTime: newEnd ? newEnd.toISOString() : undefined,
        // Keep the same _id but we might want to add a suffix to distinguish occurrences
        // For now, we keep the same _id; we can add a `occurrence` field if needed.
      })
    })
  })

  return expanded
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'list'>('month')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Expand recurring events for the current month
  const expandedEvents = useMemo(() => {
    return expandEventsForMonth(events, currentYear, currentMonth)
  }, [events, currentYear, currentMonth])

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Group expanded events by day
  const eventsByDay = useMemo(() => {
    const grouped: { [key: number]: Event[] } = {}
    expandedEvents.forEach((event) => {
      const date = new Date(event.startDateTime)
      // Only include if it falls within the current month (should all be, but safe)
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const day = date.getDate()
        if (!grouped[day]) grouped[day] = []
        grouped[day].push(event)
      }
    })
    return grouped
  }, [expandedEvents, currentMonth, currentYear])

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const monthNames = [
    'Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni',
    'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba'
  ]

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('sw', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatEventDate = (event: Event) => {
    const start = new Date(event.startDateTime)
    const end = event.endDateTime ? new Date(event.endDateTime) : null
    if (end && start.toDateString() !== end.toDateString()) {
      return `${start.toLocaleDateString('sw', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} – ${end.toLocaleDateString('sw', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`
    }
    return start.toLocaleDateString('sw', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const formatEventTimeRange = (event: Event) => {
    const start = new Date(event.startDateTime)
    const end = event.endDateTime ? new Date(event.endDateTime) : null
    if (end && start.toDateString() === end.toDateString()) {
      return `${formatTime(event.startDateTime)} – ${formatTime(event.endDateTime!)}`
    }
    return formatTime(event.startDateTime)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        {/* Calendar Header Controls */}
        <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-primary-700 min-w-[180px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={goToToday}
              className="px-4 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Leo
            </button>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                view === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mwezi
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Orodha
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        {view === 'month' && (
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day, index) => (
                <div key={index} className="text-center text-sm font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square p-1 bg-gray-50 rounded-lg" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dayEvents = eventsByDay[day] || []
                const isToday = new Date().getDate() === day &&
                  new Date().getMonth() === currentMonth &&
                  new Date().getFullYear() === currentYear

                return (
                  <div
                    key={day}
                    className={`aspect-square p-1 rounded-lg transition-colors ${
                      dayEvents.length > 0
                        ? 'bg-primary-50 hover:bg-primary-100 cursor-pointer'
                        : 'hover:bg-gray-50'
                    } ${isToday ? 'ring-2 ring-primary-400' : ''}`}
                  >
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-medium ${isToday ? 'text-primary-700' : 'text-gray-700'}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <button
                              key={event._id}
                              onClick={() => setSelectedEvent(event)}
                              className="block w-full text-left text-xs truncate text-primary-600 hover:text-primary-800 hover:underline"
                            >
                              {event.title}
                            </button>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{dayEvents.length - 2} zaidi
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="p-4">
            {expandedEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Hakuna matukio kwa mwezi huu.</p>
            ) : (
              <div className="space-y-4">
                {expandedEvents.map((event) => (
                  <button
                    key={`${event._id}-${event.startDateTime}`}
                    onClick={() => setSelectedEvent(event)}
                    className="block w-full text-left p-4 border rounded-xl hover:shadow-medium transition-shadow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-primary-700">{event.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(event.startDateTime).toLocaleDateString('sw', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {event.endDateTime && (
                            <span>
                              {' '}
                              – {new Date(event.endDateTime).toLocaleDateString('sw', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          )}
                        </p>
                        {event.location && <p className="text-sm text-gray-400 mt-1">📍 {event.location}</p>}
                        {event.recurring?.isRecurring && (
                          <p className="text-xs text-gold-600 font-medium mt-1">
                            🔄 {event.recurring.rule || 'Linarudia'}
                          </p>
                        )}
                      </div>
                      <span className="text-primary-600 text-sm font-medium">Tazama →</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-primary-700">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {selectedEvent.coverImage && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={urlFor(selectedEvent.coverImage).width(800).height(400).url()}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500">Tarehe</p>
                <p className="text-gray-800">{formatEventDate(selectedEvent)}</p>
                <p className="text-sm text-gray-600 mt-1">{formatEventTimeRange(selectedEvent)}</p>
              </div>

              {selectedEvent.location && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Mahali</p>
                  <p className="text-gray-800">{selectedEvent.location}</p>
                </div>
              )}

              {selectedEvent.recurring?.isRecurring && selectedEvent.recurring?.rule && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Linarudia</p>
                  <p className="text-gold-600 font-medium">{selectedEvent.recurring.rule}</p>
                </div>
              )}

              {selectedEvent.description && selectedEvent.description.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Maelezo</p>
                  <div className="prose prose-sm max-w-none mt-2 text-gray-700">
                    <PortableText value={selectedEvent.description} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}