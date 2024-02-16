"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collectPar = collectPar;
exports.collectParN = collectParN;
exports.collectParN_ = collectParN_;
exports.collectPar_ = collectPar_;
exports.collect_ = collect_;

var _compact = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/compact.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _map = /*#__PURE__*/require("./map.js");

var _optional = /*#__PURE__*/require("./optional.js");

// ets_tracing: off

/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */
function collect(f, __trace) {
  return self => collect_(self, f, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */


function collect_(self, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEach_)(self, a => (0, _optional.optional)(f(a)), __trace), _compact.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */


function collectPar(f, __trace) {
  return self => collectPar_(self, f, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */


function collectPar_(self, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachPar_)(self, a => (0, _optional.optional)(f(a)), __trace), _compact.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */


function collectParN_(self, n, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachParN_)(self, n, a => (0, _optional.optional)(f(a)), __trace), _compact.compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectParN_
 */


function collectParN(n, f, __trace) {
  return self => collectParN_(self, n, f, __trace);
}
//# sourceMappingURL=collect.js.map