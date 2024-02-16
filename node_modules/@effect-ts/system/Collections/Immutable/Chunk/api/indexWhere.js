"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexWhere = indexWhere;
exports.indexWhere_ = indexWhere_;

var _indexWhereFrom = /*#__PURE__*/require("./indexWhereFrom.js");

/**
 * Returns the first index for which the given predicate is satisfied.
 */
function indexWhere_(self, f) {
  return (0, _indexWhereFrom.indexWhereFrom_)(self, 0, f);
}
/**
 * Returns the first index for which the given predicate is satisfied.
 *
 * @ets_data_first indexWhere_
 */


function indexWhere(f) {
  return self => indexWhere_(self, f);
}
//# sourceMappingURL=indexWhere.js.map