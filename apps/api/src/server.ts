import 'dotenv/config';
import { createApp } from './app.js';
import { loadEnv } from './config/env.js';
import { logger } from './lib/logger.js';

const env = loadEnv();

createApp().listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'API listening');
});
