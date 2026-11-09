import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../src/errors/index.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';

function appThrowing(error: Error) {
  const app = express();
  app.get('/boom', () => {
    throw error;
  });
  app.use(errorHandler);
  return app;
}

describe('errorHandler', () => {
  it.each([
    [new ValidationError('bad', [{ field: 'x' }]), 400, 'VALIDATION_ERROR'],
    [new UnauthorizedError(), 401, 'UNAUTHORIZED'],
    [new ForbiddenError(), 403, 'FORBIDDEN'],
    [new NotFoundError(), 404, 'NOT_FOUND'],
    [new ConflictError(), 409, 'CONFLICT'],
  ])('maps %o', async (error, status, code) => {
    const res = await request(appThrowing(error)).get('/boom');
    expect(res.status).toBe(status);
    expect(res.body.error.code).toBe(code);
    expect(res.body.error.message).toBe(error.message);
    expect(Array.isArray(res.body.error.details)).toBe(true);
  });

  it('includes validation details', async () => {
    const res = await request(appThrowing(new ValidationError('bad', [{ field: 'x' }]))).get(
      '/boom',
    );
    expect(res.body.error.details).toEqual([{ field: 'x' }]);
  });

  it('maps unknown errors to 500 without leaking stack or message', async () => {
    const res = await request(appThrowing(new Error('secret internals'))).get('/boom');
    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
    expect(JSON.stringify(res.body)).not.toContain('secret internals');
    expect(JSON.stringify(res.body)).not.toContain('at ');
  });
});
