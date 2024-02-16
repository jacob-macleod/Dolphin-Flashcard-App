// ets_tracing: off
export function Int(n) {
  if (!Number.isInteger(n)) {
    throw new Error("not an integer");
  }

  return n;
}
//# sourceMappingURL=index.mjs.map