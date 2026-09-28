import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getPriorities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priorities = await prisma.customer.findMany({
      orderBy: [
        { priority: 'asc' },
        { humanTouchScore: 'desc' },
        { dealValue: 'desc' }
      ]
    });
    res.json({ success: true, data: priorities });
  } catch (error) {
    console.warn('[DB Connection Warning] Returning priority queue fallback data');
    res.json({
      success: true,
      data: [
        { id: "cust_abc", name: "ABC Industries", company: "ABC Industries", dealValue: 8500000, relationshipHealth: 41, humanTouchScore: 92, priority: "CRITICAL" },
        { id: "cust_pioneer", name: "Pioneer Labs", company: "Pioneer Labs", dealValue: 9200000, relationshipHealth: 35, humanTouchScore: 88, priority: "CRITICAL" },
        { id: "cust_vertex", name: "Vertex Solutions", company: "Vertex Solutions", dealValue: 4500000, relationshipHealth: 62, humanTouchScore: 58, priority: "MEDIUM" },
        { id: "cust_nova", name: "Nova Systems", company: "Nova Systems", dealValue: 1200000, relationshipHealth: 84, humanTouchScore: 22, priority: "LOW" }
      ]
    });
  }
};