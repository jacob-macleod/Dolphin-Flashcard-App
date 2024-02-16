"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collect_ = collect_;

var _compact = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/compact.js");

var _core = /*#__PURE__*/require("./core.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _optional = /*#__PURE__*/require("./optional.js");

// ets_tracing: off

/**
 * Evaluate each sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */
function collect(f) {
  return self => collect_(self, f);
}
/**
 * Evaluate each Sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */


function collect_(self, f) {
  return (0, _core.map_)((0, _exclForEach.forEach_)(self, a => (0, _optional.optional)(f(a))), _compact.compact);
}
//# sourceMappingURL=collect.js.map