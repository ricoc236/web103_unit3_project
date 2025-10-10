import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = ({ id, title, date, time, image }) => {
    const [formattedTime, setFormattedTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        // Format time (e.g., "18:00:00" → "6:00 PM")
        const formatTime = (timeStr) => {
            if (!timeStr) return ''
            const [hours, minutes] = timeStr.split(':')
            const date = new Date()
            date.setHours(hours, minutes)
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        }

        setFormattedTime(formatTime(time))
    }, [time])

    useEffect(() => {
        // Calculate remaining time until event
        const updateRemainingTime = () => {
            if (!date || !time) return ''
            const eventDateTime = new Date(`${date.split('T')[0]}T${time}`)
            const now = new Date()
            const diff = eventDateTime - now

            if (diff <= 0) {
                setRemaining('Event has started!')
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((diff / (1000 * 60)) % 60)

            if (days > 0)
                setRemaining(`${days} day${days > 1 ? 's' : ''} remaining`)
            else if (hours > 0)
                setRemaining(`${hours} hour${hours > 1 ? 's' : ''} remaining`)
            else
                setRemaining(`${minutes} minute${minutes > 1 ? 's' : ''} remaining`)
        }

        updateRemainingTime()
        const interval = setInterval(updateRemainingTime, 60000) // update every minute
        return () => clearInterval(interval)
    }, [date, time])

    return (
        <article className='event-information'>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i>{' '}
                        {new Date(date).toLocaleDateString()} <br /> {formattedTime}
                    </p>
                    <p id={`remaining-${id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
