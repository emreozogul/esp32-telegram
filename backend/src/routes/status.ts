import { Router } from 'express';
import { wateringStatus } from '../bot';

const router = Router();

// Endpoint to get the current status of the watering system
router.get('/', (req, res) => {
    res.json({ status: wateringStatus });
});

export default router;