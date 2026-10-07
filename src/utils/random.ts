/**
 * Returns an email that has never been used before, e.g. `auto.signup.1791312776127@example.com`.
 * `example.com` is reserved for testing, so no real person ever receives mail there.
 */
export function uniqueEmail(prefix = 'auto'): string {
  return `${prefix}.${uniqueSuffix()}@example.com`;
}

/** Returns a name that has never been used before, e.g. `Auto Category 1791393222411123`. */
export function uniqueName(prefix: string): string {
  return `${prefix} ${uniqueSuffix()}`;
}

function uniqueSuffix(): string {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}
