import { Router } from 'express';
import { performAnalysis } from '../controllers/analysisController';
const router = Router();
router.post('/analyze-customer/:id', performAnalysis);
export default router;