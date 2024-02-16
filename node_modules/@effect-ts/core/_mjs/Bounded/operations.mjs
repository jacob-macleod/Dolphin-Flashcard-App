/**
 * Creates Bounded[A] from equals & compare functions
 */
export function makeBounded(compare, top, bottom) {
  return {
    compare,
    bottom,
    top
  };
}
//# sourceMappingURL=operations.mjs.map