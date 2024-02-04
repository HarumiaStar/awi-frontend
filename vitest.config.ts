import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8' // or 'v8'
    },
    setupFiles: ['./src/__tests__/data/setup.ts'],
  },
  
})