"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterNot = filterNot;
exports.filterNot_ = filterNot_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _filter = /*#__PURE__*/require("./filter.js");

/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */
function filterNot_(self, pred) {
  return (0, _filter.filter_)(self, (0, _index.not)(pred));
}
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */


function filterNot(pred) {
  return self => filterNot_(self, pred);
}
//# sourceMappingURL=filterNot.js.map