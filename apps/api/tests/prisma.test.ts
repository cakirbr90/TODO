import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';

const normalize = (source: string): string[] =>
  source
    .replace(/^(enum \w+)\s*\{([^\n}]*)\}/gm, (_, head: string, body: string) =>
      [`${head} {`, ...body.trim().split(/\s+/), '}'].join('\n'),
    )
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter(Boolean);

const readPrismaBlock = (): string => {
  const doc = readFileSync(resolve(__dirname, '../../../docs/DATA_MODEL.md'), 'utf8');
  const match = /```prisma\n([\s\S]*?)```/.exec(doc);
  if (!match?.[1]) throw new Error('prisma block missing in DATA_MODEL.md');
  return match[1];
};

const declarations = (source: string): string[] =>
  normalize(source).filter((line) => /^(model|enum) /.test(line) || /^[@\w]/.test(line));

describe('prisma schema', () => {
  it('contains every model and enum of DATA_MODEL.md unchanged', () => {
    const schema = readFileSync(resolve(__dirname, '../prisma/schema.prisma'), 'utf8');
    const schemaLines = new Set(declarations(schema));
    const missing = declarations(readPrismaBlock()).filter((line) => !schemaLines.has(line));
    expect(missing).toEqual([]);
  });
});

describe('prisma singleton', () => {
  it('returns the same client across module reloads', async () => {
    vi.stubEnv('DATABASE_URL', 'postgresql://user:pass@localhost:5432/unused_test_db');
    vi.resetModules();
    const first = (await import('../src/lib/prisma.js')).prisma;
    vi.resetModules();
    const second = (await import('../src/lib/prisma.js')).prisma;
    expect(second).toBe(first);
    await first.$disconnect();
  });
});
