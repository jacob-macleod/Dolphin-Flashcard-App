"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectAll = collectAll;
exports.collectAllUnit = collectAllUnit;
exports.collectAllWith = collectAllWith;
exports.collectAllWith_ = collectAllWith_;
exports.forEach = forEach;
exports.forEachUnit = forEachUnit;
exports.forEachUnit_ = forEachUnit_;
exports.forEach_ = forEach_;

var ChunkCollect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/collect.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var _index = /*#__PURE__*/require("../Function/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */
function forEach_(as, f) {
  return core.suspend(() => {
    const acc = [];
    return core.map_(forEachUnit_(as, a => core.map_(f(a), b => {
      acc.push(b);
    })), () => Chunk.from(acc));
  });
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */


function forEach(f) {
  return as => forEach_(as, f);
}

function forEachUnitLoop(iterator, f) {
  const next = iterator.next();
  return next.done ? core.unit : core.chain_(f(next.value), () => forEachUnitLoop(iterator, f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */


function forEachUnit_(as, f, __trace) {
  return core.suspend(() => forEachUnitLoop(as[Symbol.iterator](), f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced Syncs sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */


function forEachUnit(f, __trace) {
  return as => forEachUnit_(as, f);
}
/**
 * Evaluate each Sync in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */


function collectAll(as) {
  return forEach_(as, _index.identity);
}
/**
 * Evaluate each Sync in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */


function collectAllUnit(as, __trace) {
  return forEachUnit_(as, _index.identity);
}
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWith_(as, pf, __trace) {
  return core.map_(collectAll(as), ChunkCollect.collect(pf));
}
/**
 * Evaluate each Sync in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */


function collectAllWith(pf) {
  return as => collectAllWith_(as, pf);
}
//# sourceMappingURL=excl-forEach.js.map