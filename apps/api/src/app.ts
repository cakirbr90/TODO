import express, { type Express } from 'express';
import { healthRouter } from './routes/health.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

export function createApp(): Express {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(healthRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
