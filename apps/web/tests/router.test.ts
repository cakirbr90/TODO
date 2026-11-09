import { describe, expect, it } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../src/router';

describe('router', () => {
  it('resolves home and falls back to not-found', () => {
    const router = createRouter({ history: createMemoryHistory(), routes });
    expect(router.resolve('/').name).toBe('home');
    expect(router.resolve('/nope/x').name).toBe('not-found');
  });
});
