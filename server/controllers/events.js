import { pool } from '../config/database.js'


const getEvents = async (req, res) => {
    try {
     
        const query = `
            SELECT 
                e.id, 
                e.title, 
                e.date, 
                e.time, 
                e.image, 
                l.name AS location_name,
                l.slug AS location_slug
            FROM 
                events e
            JOIN 
                locations l ON e.location_id = l.id
            ORDER BY 
                e.date ASC, e.time ASC
        `
        const result = await pool.query(query)
        res.status(200).json(result.rows)
    } catch (err) {
        console.error("Error fetching all events:", err);
        res.status(500).json({ error: 'Internal server error while fetching all events' })
    }
}


export default { getEvents }
