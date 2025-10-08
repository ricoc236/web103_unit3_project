import { pool } from './database.js'
import './dotenv.js'
import locationData from '../data/Locations.js'
import eventData from '../data/Events.js'


const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            image VARCHAR(512),  -- Added image column here
            polygon_coords TEXT
        )
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 locations table created successfully (with image column)')
    }
    catch (err) {
        console.error('⚠️ error creating locations table', err)
        throw err
    }
}


const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            date DATE, 
            time TIME, 
            image VARCHAR(512)
        )
    `
    try {
        await pool.query(createTableQuery)
        console.log('🎉 events table created successfully with Foreign Key link')
    }
    catch (err) {
        console.error('⚠️ error creating events table', err)
        throw err
    }
}



const seedLocationsTable = async () => {
    try {
        const insertPromises = locationData.map(location => {
            const insertQuery = {
                
                text: 'INSERT INTO locations (slug, name, address, image, polygon_coords) VALUES ($1, $2, $3, $4, $5)', 
                values: [
                    location.slug,
                    location.name,
                    location.address,
                    location.image, 
                    location.polygon_coords
                ]
            };

            return pool.query(insertQuery);
        });

        await Promise.all(insertPromises);
        console.log('\n--- 🎉 All locations seeded successfully (with images)! ---');

    } catch (error) {
        console.error('\n--- ❌ Seeding locations halted due to error: ---', error.message);
        throw error;
    }
}



const seedEventsTable = async () => {
    try {
        const insertPromises = eventData.map(event => {
            const insertQuery = {
                text: 'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)',
                values: [
                    event.title, 
                    event.date, 
                    event.time, 
                    event.image,
                    event.location_id 
                ]
            };

            return pool.query(insertQuery);
        });

        await Promise.all(insertPromises);
        console.log('\n--- 🎉 All events seeded successfully and linked! ---');

    } catch (error) {
        console.error('\n--- ❌ Seeding events halted due to error: ---', error.message);
        throw error;
    }
}


const seedAllTables = async () => {
    try {
        console.log('--- Starting Database Seeding ---');
        

        await createLocationsTable();
        await createEventsTable();

     
        await seedLocationsTable();
        await seedEventsTable();

        console.log('\n--- ✅ Database Seeding Complete ---');
        
    } catch (error) {
       
        console.error('\n--- 🔴 FATAL ERROR: Seeding failed entirely. ---');
        process.exit(1); 
    }
}

seedAllTables()
