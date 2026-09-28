import { Request, Response, NextFunction } from 'express';
import { getDashboardStats } from '../services/dashboardService';

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};