import React, { useEffect, useState } from 'react'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events')
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }
        const data = await res.json()
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <p>Loading events...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div className='events-page'>
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul className='event-list'>
          {events.map((event, i) => (
            <li key={i} className='event-item'>
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              {event.description && <p>{event.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Events
