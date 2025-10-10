const BASE_URL = '/api/events';

const EventsAPI = {

    getAllEvents: async () => {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return data; 
        } catch (error) {
            console.error('Failed to fetch all events:', error);
            throw error;
        }
    },


    getEventById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Event with ID ${id} not found.`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch event ${id}:`, error);
            throw error;
        }
    }
};

export default EventsAPI;
