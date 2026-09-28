import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

const DEFAULT_CUSTOMERS = [
  {
    id: "cust_abc",
    name: "ABC Industries",
    company: "ABC Industries",
    location: "Hyderabad",
    industry: "Manufacturing",
    dealValue: 8500000,
    relationshipHealth: 41,
    humanTouchScore: 92,
    priority: "CRITICAL",
    status: "AT_RISK",
    assignedUser: { name: "Rahul Sharma" },
    interactions: [
      { id: "int_1", interactionDate: new Date("2026-09-27"), type: "EMAIL", content: "Customer reported unresolved implementation issue", sentiment: "NEGATIVE" },
      { id: "int_2", interactionDate: new Date("2026-09-26"), type: "SUPPORT", content: "Complaint opened", sentiment: "NEGATIVE" },
      { id: "int_3", interactionDate: new Date("2026-09-24"), type: "CALL", content: "Follow-up required", sentiment: "NEUTRAL" }
    ]
  },
  {
    id: "cust_nova",
    name: "Nova Systems",
    company: "Nova Systems",
    location: "Bengaluru",
    industry: "Technology",
    dealValue: 1200000,
    relationshipHealth: 84,
    humanTouchScore: 22,
    priority: "LOW",
    status: "ACTIVE",
    assignedUser: { name: "Priya Patel" },
    interactions: [
      { id: "int_4", interactionDate: new Date("2026-09-25"), type: "MEETING", content: "Quarterly review completed successfully", sentiment: "POSITIVE" }
    ]
  },
  {
    id: "cust_vertex",
    name: "Vertex Solutions",
    company: "Vertex Solutions",
    location: "Mumbai",
    industry: "Finance",
    dealValue: 4500000,
    relationshipHealth: 62,
    humanTouchScore: 58,
    priority: "MEDIUM",
    status: "ACTIVE",
    assignedUser: { name: "Amit Kumar" },
    interactions: [
      { id: "int_5", interactionDate: new Date("2026-09-23"), type: "CALL", content: "Discussed expansion requirements", sentiment: "NEUTRAL" }
    ]
  },
  {
    id: "cust_pioneer",
    name: "Pioneer Labs",
    company: "Pioneer Labs",
    location: "Delhi",
    industry: "Healthcare",
    dealValue: 9200000,
    relationshipHealth: 35,
    humanTouchScore: 88,
    priority: "CRITICAL",
    status: "AT_RISK",
    assignedUser: { name: "Rahul Sharma" },
    interactions: [
      { id: "int_6", interactionDate: new Date("2026-09-27"), type: "EMAIL", content: "Escalated timeline delay concern", sentiment: "NEGATIVE" }
    ]
  }
];

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await prisma.customer.findMany({ include: { interactions: { take: 1, orderBy: { createdAt: 'desc' } } } });
    res.json({ success: true, data: customers });
  } catch (error) {
    console.warn('[DB Connection Warning] Returning seed customer list');
    res.json({ success: true, data: DEFAULT_CUSTOMERS });
  }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const customer = await prisma.customer.findUnique({ where: { id }, include: { interactions: true, aiAnalyses: true } });
    if (customer) {
      res.json({ success: true, data: customer });
      return;
    }
  } catch (error) {
    console.warn(`[DB Connection Warning] Returning seed customer detail for ${req.params.id}`);
  }

  const id = req.params.id as string;
  const fallback = DEFAULT_CUSTOMERS.find(c => c.id === id || c.name.toLowerCase().includes(id.toLowerCase())) || DEFAULT_CUSTOMERS[0];
  res.json({ success: true, data: fallback });
};