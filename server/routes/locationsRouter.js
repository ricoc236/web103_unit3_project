import express from 'express';
import locationController from '../controllers/locations.js'; 
const router = express.Router();


router.get('/', locationController.getAllLocations);


router.get('/:slug', locationController.getLocationAndEventsBySlug);

export default router;
