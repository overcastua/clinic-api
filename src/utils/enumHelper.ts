export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${x}`);
}
