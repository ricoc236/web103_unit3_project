import { pool } from '../config/database.js'


const getAllLocations = async (req, res) => {
    try {
   
        const query = 'SELECT id, slug, name, address, image, polygon_coords FROM locations ORDER BY id ASC';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching all locations:", err);
        res.status(500).json({ error: 'Internal server error while fetching locations' });
    }
}


const getLocationAndEventsBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
   
        const locationQuery = 'SELECT id, slug, name, address, image FROM locations WHERE slug = $1';
        const locationResult = await pool.query(locationQuery, [slug]);

        if (locationResult.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found.' });
        }
        const location = locationResult.rows[0];

      
        const eventsQuery = `
            SELECT 
                id, title, date, time, image 
            FROM 
                events 
            WHERE 
                location_id = $1
            ORDER BY 
                date ASC, time ASC
        `;
        const eventsResult = await pool.query(eventsQuery, [location.id]);
        
    
        res.status(200).json({
            location: location,
            events: eventsResult.rows
        });

    } catch (err) {
        console.error(`Error fetching data for slug ${slug}:`, err);
        res.status(500).json({ error: 'Internal server error while fetching location events.' });
    }
}

export default { 
    getAllLocations, 
    getLocationAndEventsBySlug 
}
