// Stub for `server-only` / `client-only` under Vitest, which otherwise throws
// because it resolves the guard export. Server modules are safe to load in the
// node test environment.
export {};
