import { Router } from 'express';
import { createInteraction } from '../controllers/interactionController';

const router = Router({ mergeParams: true });

router.post('/', createInteraction);

export default router;
