/**
 * Returns an email that has never been used before, e.g. `auto.signup.1791312776127@example.com`.
 * `example.com` is reserved for testing, so no real person ever receives mail there.
 */
export function uniqueEmail(prefix = 'auto'): string {
  return `${prefix}.${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;
}
