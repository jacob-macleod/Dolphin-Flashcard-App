/**
 * Merges groups in parallel and the results in arbitrary order.
 */
export function mergeGroupBy(f) {
  return self => self.merge(f);
}
//# sourceMappingURL=mergeGroupBy.mjs.map