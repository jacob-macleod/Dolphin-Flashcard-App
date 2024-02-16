/**
 * Reads the value associated with the current fiber. Returns initial value if
 * no value was `set` or inherited from parent.
 */
export function get(fiberRef) {
  return fiberRef.get;
}
//# sourceMappingURL=get.mjs.map