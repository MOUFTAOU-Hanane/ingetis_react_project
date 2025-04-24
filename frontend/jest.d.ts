declare global {
    const test: typeof import('@jest/globals')['test']
    const expect: typeof import('@jest/globals')['expect']
}
  
export {}