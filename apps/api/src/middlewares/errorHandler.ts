import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError, NotFoundError } from '../errors/AppError.js';
import { logger } from '../lib/logger.js';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError());
};

// Express identifies error middleware by its 4-argument signature.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ error: { code: err.code, message: err.message, details: err.details } });
    return;
  }
  logger.error({ err, method: req.method, path: req.path }, 'Unhandled error');
  res
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error', details: [] } });
};
