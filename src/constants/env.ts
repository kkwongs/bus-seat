const useMock = import.meta.env.VITE_USE_MOCK === 'true'

export const env = {
  useMock,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
} as const
