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