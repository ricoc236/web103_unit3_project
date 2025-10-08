/**
 * Data for the 'events' table.
 * Each event explicitly links to a location via the location_id (1, 2, 3, or 4).
 */
const eventData = [
    // --- LOCATION ID 1: Echo Lounge ---
    {
        title: "The Neon Dreams Concert",
        date: "2025-11-20",
        time: "19:30:00",
        image: "https://i.imgur.com/8QW1VjW.jpeg",
        location_id: 1
    },
    {
        title: "Late Night Jazz Session",
        date: "2025-11-25",
        time: "22:00:00",
        image: "https://i.imgur.com/uGzX6Lq.jpeg",
        location_id: 1
    },
    {
        title: "Electro Pop DJ Set",
        date: "2025-12-05",
        time: "20:45:00",
        image: "https://i.imgur.com/o1F2N8z.jpeg",
        location_id: 1
    },

    // --- LOCATION ID 2: House of Blues ---
    {
        title: "Blues and BBQ Festival",
        date: "2025-11-15",
        time: "18:00:00",
        image: "https://i.imgur.com/b5P6w7L.jpeg",
        location_id: 2
    },
    {
        title: "The Classic Rock Revival",
        date: "2025-12-01",
        time: "20:00:00",
        image: "https://i.imgur.com/r3Cq4h2.jpeg",
        location_id: 2
    },

    // --- LOCATION ID 3: Pavilion ---
    {
        title: "Summer Outdoor Movie Night",
        date: "2025-12-10",
        time: "17:45:00",
        image: "https://i.imgur.com/a4g2z0X.jpeg",
        location_id: 3
    },
    {
        title: "Local Artists Showcase",
        date: "2025-12-18",
        time: "19:00:00",
        image: "https://i.imgur.com/mE0qD5l.jpeg",
        location_id: 3
    },

    // --- LOCATION ID 4: American Airlines ---
    {
        title: "Basketball Championship Final",
        date: "2025-11-30",
        time: "19:00:00",
        image: "https://i.imgur.com/wVf7lQJ.jpeg",
        location_id: 4
    },
    {
        title: "Major League Hockey Game",
        date: "2025-12-08",
        time: "18:30:00",
        image: "https://i.imgur.com/G3E8j2h.jpeg",
        location_id: 4
    }
];

export default eventData;