export const mockDelay = (ms = 300): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
