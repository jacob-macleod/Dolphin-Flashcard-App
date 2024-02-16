"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.forEachExec = forEachExec;
exports.forEachExec_ = forEachExec_;
exports.forEachPar = forEachPar;
exports.forEachParN = forEachParN;
exports.forEachParN_ = forEachParN_;
exports.forEachPar_ = forEachPar_;
exports.forEachUnit = forEachUnit;
exports.forEachUnit_ = forEachUnit_;
exports.forEach_ = forEach_;

var _unzip = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/unzip.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _ExecutionStrategy = /*#__PURE__*/require("../Effect/ExecutionStrategy.js");

var _core2 = /*#__PURE__*/require("./core.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps.js"));

var _managed = /*#__PURE__*/require("./managed.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */
function forEach(f, __trace) {
  return as => forEach_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `B[]`.
 *
 * For a parallel version of this method, see `forEachPar_`.
 * If you do not need the results, see `forEachUnit_` for a more efficient implementation.
 */


function forEach_(as, f, __trace) {
  return (0, _managed.managedApply)(T.map_(T.forEach_(as, a => f(a).effect, __trace), res => {
    const fins = Chunk.map_(res, k => k.get(0));
    const as = Chunk.map_(res, k => k.get(1));
    return Tp.tuple(e => T.forEach_(Chunk.reverse(fins), fin => fin(e), __trace), as);
  }));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */


function forEachExec_(as, es, f, __trace) {
  switch (es._tag) {
    case "Sequential":
      {
        return forEach_(as, f, __trace);
      }

    case "Parallel":
      {
        return forEachPar_(as, f, __trace);
      }

    case "ParallelN":
      {
        return forEachParN_(as, es.n, f, __trace);
      }
  }
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachExec_
 */


function forEachExec(es, f, __trace) {
  return as => forEachExec_(as, es, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects sequentially.
 *
 * Equivalent to `forEach(as)(f).unit`, but without the cost of building
 * the list of results.
 */


function forEachUnit_(as, f, __trace) {
  return (0, _managed.managedApply)(T.map_(T.forEach_(as, a => f(a).effect, __trace), result => {
    const {
      tuple: [fins]
    } = (0, _unzip.unzip)(result);
    return Tp.tuple(e => T.forEach_(Chunk.reverse(fins), f => f(e), __trace), undefined);
  }));
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects sequentially.
 *
 * Equivalent to `forEach(as)(f).unit`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */


function forEachUnit(f, __trace) {
  return as => forEachUnit_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */


function forEachPar(f, __trace) {
  return as => forEachPar_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * For a sequential version of this method, see `forEach_`.
 */


function forEachPar_(as, f, __trace) {
  return (0, _core2.mapM_)((0, _core2.makeManagedReleaseMap)(T.parallel, __trace), parallelReleaseMap => {
    const makeInnerMap = T.provideSome_(T.map_((0, _core2.makeManagedReleaseMap)(_ExecutionStrategy.sequential).effect, ({
      tuple: [_, x]
    }) => x), x => Tp.tuple(x, parallelReleaseMap));
    return T.forEachPar_(as, a => T.map_(T.chain_(makeInnerMap, innerMap => T.provideSome_(f(a).effect, u => Tp.tuple(u, innerMap))), ({
      tuple: [_, b]
    }) => b));
  });
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachParN_
 */


function forEachParN(n, f, __trace) {
  return as => forEachParN_(as, n, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `B[]`.
 *
 * Unlike `forEachPar_`, this method will use at most up to `n` fibers.
 */


function forEachParN_(as, n, f, __trace) {
  return (0, _core2.mapM_)((0, _core2.makeManagedReleaseMap)(T.parallelN(n), __trace), parallelReleaseMap => {
    const makeInnerMap = T.provideSome_(T.map_((0, _core2.makeManagedReleaseMap)(_ExecutionStrategy.sequential).effect, ({
      tuple: [_, x]
    }) => x), x => Tp.tuple(x, parallelReleaseMap));
    return T.forEachParN_(as, n, a => T.map_(T.chain_(makeInnerMap, innerMap => T.provideSome_(f(a).effect, u => Tp.tuple(u, innerMap))), ({
      tuple: [_, b]
    }) => b));
  });
}
//# sourceMappingURL=forEach.js.map