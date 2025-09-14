export const config = {
  DATA_SOURCE: (process.env.NEXT_PUBLIC_DATA_SOURCE as 'mock' | 'supabase') || 'mock',
  SEED_VERSION: 'v1',
  API_BASE_DELAY: { min: 200, max: 600 },
  ERROR_RATE: 0.05,
} as const;