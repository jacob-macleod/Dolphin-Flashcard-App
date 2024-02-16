"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeGroupBy = mergeGroupBy;

/**
 * Merges groups in parallel and the results in arbitrary order.
 */
function mergeGroupBy(f) {
  return self => self.merge(f);
}
//# sourceMappingURL=mergeGroupBy.js.map