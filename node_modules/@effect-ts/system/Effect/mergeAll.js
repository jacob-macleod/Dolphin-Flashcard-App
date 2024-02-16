"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAll = mergeAll;
exports.mergeAllPar = mergeAllPar;
exports.mergeAllParN = mergeAllParN;
exports.mergeAllParN_ = mergeAllParN_;
exports.mergeAllPar_ = mergeAllPar_;
exports.mergeAll_ = mergeAll_;

var _index = /*#__PURE__*/require("../Function/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-forEach.js"));

var _zipWith = /*#__PURE__*/require("./zipWith.js");

var _zipWithPar = /*#__PURE__*/require("./zipWithPar.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */
function mergeAll(zero, f, __trace) {
  return as => mergeAll_(as, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */


function mergeAll_(as, zero, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeed(zero), (b, a) => (0, _zipWith.zipWith_)(b, a, f)), __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllPar_
 */


function mergeAllPar(zero, f, __trace) {
  return as => mergeAllPar_(as, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */


function mergeAllPar_(as, zero, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeed(zero), (b, a) => (0, _zipWithPar.zipWithPar_)(b, a, f)), __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllParN_
 */


function mergeAllParN(n, zero, f, __trace) {
  return as => mergeAllParN_(as, n, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */


function mergeAllParN_(as, n, zero, f, __trace) {
  return core.chain_(Ref.makeRef(zero), acc => core.chain_(forEach.forEachUnitParN_(as, n, core.chain(a => Ref.update_(acc, b => f(b, a))), __trace), () => acc.get));
}
//# sourceMappingURL=mergeAll.js.map