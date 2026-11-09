import { describe, expect, it } from 'vitest';
import { parseEnv } from '../src/config/env.js';

const valid = {
  NODE_ENV: 'test',
  PORT: '4000',
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/fake',
  JWT_ACCESS_SECRET: 'a'.repeat(32),
  JWT_REFRESH_SECRET: 'b'.repeat(32),
  CORS_ORIGIN: 'http://localhost:5173',
};

function without(key: keyof typeof valid): Record<string, string> {
  return Object.fromEntries(Object.entries(valid).filter(([k]) => k !== key));
}

describe('parseEnv', () => {
  it('parses valid values and coerces PORT', () => {
    const env = parseEnv(valid);
    expect(env.PORT).toBe(4000);
    expect(env.DATABASE_URL_TEST).toBeUndefined();
  });

  it('defaults PORT to 3000', () => {
    expect(parseEnv(without('PORT')).PORT).toBe(3000);
  });

  it('fails on short JWT secrets without echoing values', () => {
    expect(() => parseEnv({ ...valid, JWT_ACCESS_SECRET: 'short' })).toThrow(/JWT_ACCESS_SECRET/);
  });

  it('fails on missing DATABASE_URL', () => {
    expect(() => parseEnv(without('DATABASE_URL'))).toThrow(/DATABASE_URL/);
  });

  it('fails on invalid NODE_ENV and PORT', () => {
    expect(() => parseEnv({ ...valid, NODE_ENV: 'staging' })).toThrow(/NODE_ENV/);
    expect(() => parseEnv({ ...valid, PORT: 'abc' })).toThrow(/PORT/);
  });

  it('never includes secret values in the error message', () => {
    const secret = 'tooshort-secret';
    expect(() => parseEnv({ ...valid, JWT_ACCESS_SECRET: secret })).toThrow(
      expect.objectContaining({ message: expect.not.stringContaining(secret) }),
    );
  });
});
