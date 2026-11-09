import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCounterStore } from '../src/stores/counter';

describe('counter store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('increments', () => {
    const store = useCounterStore();
    store.increment();
    expect(store.count).toBe(1);
  });
});
