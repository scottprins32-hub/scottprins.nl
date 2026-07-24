import { defineConfig } from 'vitest/config';

// calc.ts is dependency-vrije TypeScript; de volledige Astro-config
// (adapter, Tailwind) laden zou de tests alleen maar vertragen.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
