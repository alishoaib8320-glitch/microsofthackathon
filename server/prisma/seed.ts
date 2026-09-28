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