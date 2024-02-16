"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectAll = collectAll;
exports.collectAllPar = collectAllPar;
exports.collectAllUnit = collectAllUnit;
exports.collectAllUnitPar = collectAllUnitPar;
exports.collectAllWith = collectAllWith;
exports.collectAllWithPar = collectAllWithPar;
exports.collectAllWithPar_ = collectAllWithPar_;
exports.collectAllWith_ = collectAllWith_;
exports.forEach = forEach;
exports.forEachPar = forEachPar;
exports.forEachPar_ = forEachPar_;
exports.forEachUnit = forEachUnit;
exports.forEachUnitPar = forEachUnitPar;
exports.forEachUnitPar_ = forEachUnitPar_;
exports.forEachUnit_ = forEachUnit_;
exports.forEach_ = forEach_;

var Collect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/collect.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var _index = /*#__PURE__*/require("../Function/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `Chunk<B>`.
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
 * returns the results in a new `Chunk<B>`.
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
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */


function forEachUnit_(as, f) {
  return core.suspend(() => forEachUnitLoop(as[Symbol.iterator](), f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */


function forEachUnit(f) {
  return as => forEachUnit_(as, f);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 *
 * Additionally, interrupts all effects on any failure.
 */


function forEachUnitPar_(as, f) {
  return core.chain_(core.environment(), env => core.promise(onInterrupt => {
    return new Promise((resolve, reject) => {
      const is = new core.InterruptionState();
      const promises = [];
      onInterrupt(() => {
        is.interrupt();
      });

      const interruptOnFailure = ex => {
        if (ex._tag === "Failure" && !is.interrupted) {
          is.interrupt();
          reject(ex.e);
        }
      };

      for (const a of as) {
        promises.push(core.runPromiseExitEnv(f(a), env, is).then(interruptOnFailure));
      }

      Promise.all(promises).then(() => {
        resolve();
      });
    });
  }, e => e));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 * Behaves almost like this code:
 *
 * Additionally, interrupts all effects on any failure.
 *
 * @ets_data_first forEachUnitPar_
 */


function forEachUnitPar(f) {
  return as => forEachUnitPar_(as, f);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 */


function forEachPar_(as, f) {
  return core.suspend(() => core.chain_(core.succeedWith(() => []), array => core.map_(forEachUnitPar_(I.map_(as, (a, n) => [a, n]), ([a, n]) => core.chain_(core.suspend(() => f(a)), b => core.succeedWith(() => {
    array[n] = b;
  }))), () => Chunk.from(array))));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `Chunk<B>`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */


function forEachPar(f) {
  return as => forEachPar_(as, f);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */


function collectAll(as) {
  return forEach_(as, _index.identity);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */


function collectAllPar(as) {
  return forEachPar_(as, _index.identity);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */


function collectAllUnit(as) {
  return forEachUnit_(as, _index.identity);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */


function collectAllUnitPar(as) {
  return forEachUnitPar_(as, _index.identity);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWith_(as, pf) {
  return core.map_(collectAll(as), Collect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */


function collectAllWith(pf) {
  return as => collectAllWith_(as, pf);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWithPar_(as, pf) {
  return core.map_(collectAllPar(as), Collect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */


function collectAllWithPar(pf) {
  return as => collectAllWithPar_(as, pf);
}
//# sourceMappingURL=excl-forEach.js.map