# HumanTouch AI - Backend Foundation

This repository contains the production-ready backend foundation for HumanTouch AI, preparing it for the future Microsoft Foundry AI integration.

## 1. Project Architecture

The architecture consists of a Node.js + Express backend interacting with a PostgreSQL database via Prisma ORM.

```
Existing Next.js Frontend
              |
              | REST API
              ↓
       Node.js + Express
              |
       ┌──────┴──────┐
       ↓             ↓
 PostgreSQL     Future AI Layer (Microsoft Foundry)
```

The codebase is highly modular, split into `routes`, `controllers`, and `services` layers to allow easy AI integration without touching the API routing logic.

## 2. Installation

1. Navigate to the backend directory:
   \`\`\`bash
   cd server
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## 3. Configure PostgreSQL

You need a running PostgreSQL database. Create a new database named `humantouch` (or similar).
If you don't have PostgreSQL installed, you can run one easily using Docker:
\`\`\`bash
docker run --name humantouch-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=humantouch -p 5432:5432 -d postgres
\`\`\`

## 4. Configure Environment Variables

Copy the example environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

Open `.env` and configure your `DATABASE_URL` with your exact PostgreSQL credentials. For example:
\`\`\`
DATABASE_URL="postgresql://postgres:password@localhost:5432/humantouch?schema=public"
\`\`\`

*(Note: Foundry environment variables are placeholders for the next phase and are not required right now).*

## 5. Run Database Migrations

Apply the Prisma schema to your database to create all tables:
\`\`\`bash
npx prisma db push
\`\`\`
*(Or use `npx prisma migrate dev --name init` for formal migrations).*

## 6. Seed Demo Data

Populate the database with realistic demo users, customers, and interactions:
\`\`\`bash
npx ts-node prisma/seed.ts
\`\`\`

## 7. Start the Backend

Run the server in development mode:
\`\`\`bash
npm run dev
\`\`\`
The server will start on `http://localhost:5000`.

## 8. API Endpoints

- **Health Check:** `GET /api/health`
- **Dashboard Stats:** `GET /api/dashboard`
- **Customers:** `GET /api/customers`, `GET /api/customers/:id`
- **Priority Queue:** `GET /api/priorities`
- **AI Analysis Placeholder:** `POST /api/analyze-customer/:id`

## 9. How the Frontend Will Connect

The existing Next.js frontend will be updated to replace its hard-coded mock arrays with `fetch()` calls to `http://localhost:5000/api/...`. The API responses strictly follow the shape expected by the frontend components.

## 10. Future Microsoft Foundry Integration

The AI features (Human Touch score calculations, sentiment analysis, next best action) will be implemented in the next phase using **Microsoft Foundry AI**. 
- The integration point is in `src/services/analysisService.ts`.
- The `analyzeCustomer()` function currently returns static placeholder data. In the future, this function will call the Foundry API to generate real structured intelligence.
