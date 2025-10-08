import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import eventController from '../controllers/events.js'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', eventController.getEvents);



export default router;
