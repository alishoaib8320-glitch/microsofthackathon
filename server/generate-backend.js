const fs = require('fs');
const path = require('path');

const dirs = [
  'src',
  'src/config',
  'src/controllers',
  'src/routes',
  'src/services',
  'src/middleware',
  'prisma'
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const files = {
  'src/config/database.ts': `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
  `,
  'src/middleware/errorHandler.ts': `
import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: { message: err.message || 'Internal Server Error', code: 'INTERNAL_SERVER_ERROR' } });
};
  `,
  'src/services/dashboardService.ts': `
import prisma from '../config/database';
export const getDashboardStats = async () => {
  const totalCustomers = await prisma.customer.count();
  const criticalAttention = await prisma.customer.count({ where: { priority: 'CRITICAL' } });
  const highPriority = await prisma.customer.count({ where: { priority: 'HIGH' } });
  
  // A simplistic distribution for the mock
  return {
    totalCustomers,
    criticalAttention,
    highPriority,
    automated: Math.floor(totalCustomers * 0.82),
    visitsToday: await prisma.visit.count({ where: { scheduledDate: new Date() } }),
    attentionDistribution: {
      automated: 82,
      humanFollowUp: 9,
      callRequired: 6,
      physicalVisit: 3
    }
  };
};
  `,
  'src/controllers/dashboardController.ts': `
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
  `,
  'src/routes/dashboardRoutes.ts': `
import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController';
const router = Router();
router.get('/', getDashboard);
export default router;
  `,
  'src/controllers/customerController.ts': `
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await prisma.customer.findMany({ include: { interactions: { take: 1, orderBy: { createdAt: 'desc' } } } });
    res.json({ success: true, data: customers });
  } catch (error) { next(error); }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await prisma.customer.findUnique({ where: { id: req.params.id }, include: { interactions: true, aiAnalyses: true } });
    if (!customer) return res.status(404).json({ success: false, error: { message: 'Customer not found', code: 'CUSTOMER_NOT_FOUND' } });
    res.json({ success: true, data: customer });
  } catch (error) { next(error); }
};
  `,
  'src/routes/customerRoutes.ts': `
import { Router } from 'express';
import { getCustomers, getCustomerById } from '../controllers/customerController';
const router = Router();
router.get('/', getCustomers);
router.get('/:id', getCustomerById);
export default router;
  `,
  'src/controllers/priorityController.ts': `
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getPriorities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const priorities = await prisma.customer.findMany({
      orderBy: [
        { priority: 'asc' }, // In actual, ENUM ordering or case statement
        { humanTouchScore: 'desc' },
        { dealValue: 'desc' }
      ]
    });
    res.json({ success: true, data: priorities });
  } catch (error) { next(error); }
};
  `,
  'src/routes/priorityRoutes.ts': `
import { Router } from 'express';
import { getPriorities } from '../controllers/priorityController';
const router = Router();
router.get('/', getPriorities);
export default router;
  `,
  'src/services/analysisService.ts': `
import prisma from '../config/database';

export const analyzeCustomer = async (customerId: string) => {
  // PLACEHOLDER: Future Microsoft Foundry integration
  return {
    sentiment: "negative",
    urgency: "high",
    relationshipHealth: 41,
    humanTouchScore: 92,
    priority: "CRITICAL",
    recommendedAction: "PHYSICAL_VISIT",
    confidence: 0.91,
    reasons: [
      "Repeated unsuccessful follow-ups",
      "Unresolved customer complaint",
      "High-value active opportunity"
    ]
  };
};
  `,
  'src/controllers/analysisController.ts': `
import { Request, Response, NextFunction } from 'express';
import { analyzeCustomer } from '../services/analysisService';

export const performAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const analysis = await analyzeCustomer(req.params.id);
    res.json({ success: true, data: analysis });
  } catch (error) { next(error); }
};
  `,
  'src/routes/analysisRoutes.ts': `
import { Router } from 'express';
import { performAnalysis } from '../controllers/analysisController';
const router = Router();
router.post('/analyze-customer/:id', performAnalysis);
export default router;
  `,
  'src/app.ts': `
import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes';
import customerRoutes from './routes/customerRoutes';
import priorityRoutes from './routes/priorityRoutes';
import analysisRoutes from './routes/analysisRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HumanTouch AI Backend' });
});

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/priorities', priorityRoutes);
app.use('/api', analysisRoutes);

app.use(errorHandler);

export default app;
  `,
  'src/server.ts': `
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
  `,
  '.env.example': `
DATABASE_URL="postgresql://user:password@localhost:5432/humantouch?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:3000"

# Future Microsoft Foundry integration placeholders
FOUNDRY_ENDPOINT=
FOUNDRY_API_KEY=
FOUNDRY_MODEL=
  `,
  'prisma/schema.prisma': `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  role       String
  department String?
  phone      String?
  customers  Customer[]
  visits     Visit[]
  auditLogs  AuditLog[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Customer {
  id                 String   @id @default(uuid())
  name               String
  company            String
  email              String?
  phone              String?
  location           String?
  industry           String?
  dealValue          Float?
  relationshipHealth Int?
  humanTouchScore    Int?
  priority           String   @default("LOW") // LOW, MEDIUM, HIGH, CRITICAL
  status             String   @default("ACTIVE") // ACTIVE, INACTIVE, PROSPECT, CUSTOMER, AT_RISK
  
  assignedUserId     String?
  assignedUser       User?    @relation(fields: [assignedUserId], references: [id])
  
  interactions       Interaction[]
  aiAnalyses         AIAnalysis[]
  recommendations    Recommendation[]
  visits             Visit[]
  automationLogs     AutomationLog[]
  
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Interaction {
  id              String   @id @default(uuid())
  customerId      String
  userId          String?
  type            String   // EMAIL, CALL, MEETING, MESSAGE, SUPPORT, VISIT
  subject         String?
  content         String?
  sentiment       String?  // POSITIVE, NEUTRAL, NEGATIVE
  urgency         String?  // LOW, MEDIUM, HIGH, CRITICAL
  resolved        Boolean  @default(false)
  interactionDate DateTime @default(now())
  
  customer        Customer @relation(fields: [customerId], references: [id])
  
  createdAt       DateTime @default(now())
}

model AIAnalysis {
  id                 String   @id @default(uuid())
  customerId         String
  interactionId      String?
  sentiment          String?
  urgency            String?
  relationshipHealth Int?
  humanTouchScore    Int?
  priority           String?
  recommendedAction  String?  // AUTOMATED_COMMUNICATION, FOLLOW_UP, SALES_CALL, PHYSICAL_VISIT, ESCALATION
  confidence         Float?
  reasons            Json?
  
  customer           Customer @relation(fields: [customerId], references: [id])
  recommendations    Recommendation[]
  
  createdAt          DateTime @default(now())
}

model Recommendation {
  id              String   @id @default(uuid())
  customerId      String
  analysisId      String?
  action          String
  priority        String
  title           String
  description     String?
  reason          String?
  status          String   @default("PENDING") // PENDING, ACCEPTED, COMPLETED, REJECTED, EXPIRED
  recommendedFor  DateTime?
  
  customer        Customer @relation(fields: [customerId], references: [id])
  aiAnalysis      AIAnalysis? @relation(fields: [analysisId], references: [id])
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Visit {
  id             String   @id @default(uuid())
  customerId     String
  assignedUserId String?
  scheduledDate  DateTime
  scheduledTime  String?
  location       String?
  objective      String?
  talkingPoints  Json?
  priority       String?
  status         String   @default("PLANNED") // PLANNED, CONFIRMED, COMPLETED, CANCELLED
  
  customer       Customer @relation(fields: [customerId], references: [id])
  assignedUser   User?    @relation(fields: [assignedUserId], references: [id])
  
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model AutomationLog {
  id               String   @id @default(uuid())
  customerId       String
  recommendationId String?
  actionType       String
  message          String?
  status           String
  executedAt       DateTime @default(now())
  
  customer         Customer @relation(fields: [customerId], references: [id])
  
  createdAt        DateTime @default(now())
}

model AuditLog {
  id         String   @id @default(uuid())
  userId     String?
  action     String
  entityType String
  entityId   String
  details    Json?
  
  user       User?    @relation(fields: [userId], references: [id])
  
  createdAt  DateTime @default(now())
}
  `,
  'prisma/seed.ts': `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  
  // Users
  const user1 = await prisma.user.create({
    data: { name: 'Alex Manager', email: 'alex@humantouch.ai', role: 'SALES_MANAGER' }
  });
  
  // Customers
  const cust1 = await prisma.customer.create({
    data: {
      name: 'ABC Industries',
      company: 'ABC Industries',
      dealValue: 8500000,
      relationshipHealth: 41,
      humanTouchScore: 92,
      priority: 'CRITICAL',
      assignedUserId: user1.id
    }
  });

  const cust2 = await prisma.customer.create({
    data: {
      name: 'Nova Systems',
      company: 'Nova Systems',
      dealValue: 1200000,
      relationshipHealth: 84,
      humanTouchScore: 22,
      priority: 'LOW',
      assignedUserId: user1.id
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  `
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
}
console.log('Files generated successfully.');
