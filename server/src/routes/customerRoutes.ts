import { Router } from 'express';
import { getCustomers, getCustomerById } from '../controllers/customerController';
import interactionRoutes from './interactionRoutes';

const router = Router();
router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.use('/:id/interactions', interactionRoutes);

export default router;