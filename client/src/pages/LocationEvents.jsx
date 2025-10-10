import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({ slug }) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const res = await fetch(`/api/locations/${slug}`)
                const data = await res.json()

                if (res.ok) {
                    setLocation(data.location)
                    setEvents(data.events)
                } else {
                    console.error('Error fetching location:', data.error)
                }
            } catch (err) {
                console.error('Error fetching location events:', err)
            }
        }

        fetchLocationData()
    }, [slug])

    if (!location) return <h2>Loading...</h2>

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>
            </header>

            <main>
                {events && events.length > 0 ? (
                    events.map(event => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
                        No events scheduled at this location yet!
                    </h2>
                )}
            </main>
        </div>
    )
}

export default LocationEvents
