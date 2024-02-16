"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;
exports.filterNot = filterNot;
exports.filterNotPar = filterNotPar;
exports.filterNotParN = filterNotParN;
exports.filterNotParN_ = filterNotParN_;
exports.filterNotPar_ = filterNotPar_;
exports.filterNot_ = filterNot_;
exports.filterPar = filterPar;
exports.filterParN = filterParN;
exports.filterParN_ = filterParN_;
exports.filterPar_ = filterPar_;
exports.filter_ = filter_;

var _compact = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/compact.js");

var _index = /*#__PURE__*/require("../Function/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-forEach.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var zipWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Filters the collection using the specified effectual predicate.
 *
 * @ets_data_first filter_
 */
function filter(f, __trace) {
  return as => filter_(as, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate.
 */


function filter_(as, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeedWith(() => []), (io, a) => zipWith.zipWith_(io, core.suspend(() => f(a)), (as_, p) => {
    if (p) {
      as_.push(a);
    }

    return as_;
  })), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 */


function filterPar_(as, f, __trace) {
  return map.map_(forEach.forEachPar_(as, a => map.map_(f(a), b => b ? O.some(a) : O.none), __trace), _compact.compact);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @ets_data_first filterPar_
 */


function filterPar(f, __trace) {
  return as => filterPar_(as, f, __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 */


function filterParN_(as, n, f, __trace) {
  return map.map_(forEach.forEachParN_(as, n, a => map.map_(f(a), b => b ? O.some(a) : O.none), __trace), _compact.compact);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * This method will use up to `n` fibers.
 *
 * @ets_data_first filterParN_
 */


function filterParN(n, f, __trace) {
  return as => filterParN_(as, n, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @ets_data_first filterNot_
 */


function filterNot(f, __trace) {
  return as => filterNot_(as, f, __trace);
}
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 */


function filterNot_(as, f, __trace) {
  return filter_(as, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */


function filterNotPar_(as, f, __trace) {
  return filterPar_(as, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotPar_
 */


function filterNotPar(f, __trace) {
  return as => filterNotPar_(as, f, __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 */


function filterNotParN_(as, n, f, __trace) {
  return filterParN_(as, n, x => map.map_(f(x), b => !b), __trace);
}
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version of it.
 *
 * @ets_data_first filterNotParN_
 */


function filterNotParN(n, f, __trace) {
  return as => filterNotParN_(as, n, f, __trace);
}
//# sourceMappingURL=filter.js.map