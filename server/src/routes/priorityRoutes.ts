import { Router } from 'express';
import { getPriorities } from '../controllers/priorityController';
const router = Router();
router.get('/', getPriorities);
export default router;