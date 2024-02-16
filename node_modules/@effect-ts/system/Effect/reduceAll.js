"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceAll = reduceAll;
exports.reduceAllPar = reduceAllPar;
exports.reduceAllParN = reduceAllParN;
exports.reduceAllParN_ = reduceAllParN_;
exports.reduceAllPar_ = reduceAllPar_;
exports.reduceAll_ = reduceAll_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var NA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/NonEmptyArray/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

var _mergeAll = /*#__PURE__*/require("./mergeAll.js");

var _zipWith = /*#__PURE__*/require("./zipWith.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 */
function reduceAll_(as, f, __trace) {
  return (0, _core.suspend)(() => A.reduce_(NA.tail(as), NA.head(as), (acc, a) => (0, _zipWith.zipWith_)(acc, a, f)), __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working sequentially.
 *
 * @ets_data_first reduceAll_
 */


function reduceAll(f, __trace) {
  return as => reduceAll_(as, f, __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 */


function reduceAllPar_(as, f, __trace) {
  return (0, _map.map_)((0, _mergeAll.mergeAllPar_)(as, O.none, (acc, elem) => O.some(O.fold_(acc, () => elem, a => f(a, elem))), __trace), O.getOrElse(() => {
    throw new Error("Bug");
  }));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in parallel.
 *
 * @ets_data_first reduceAllPar_
 */


function reduceAllPar(f, __trace) {
  return as => reduceAllPar_(as, f, __trace);
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 */


function reduceAllParN_(as, n, f, __trace) {
  return (0, _map.map_)((0, _mergeAll.mergeAllParN_)(as, n, O.none, (acc, elem) => O.some(O.fold_(acc, () => elem, a => f(a, elem))), __trace), O.getOrElse(() => {
    throw new Error("Bug");
  }));
}
/**
 * Reduces an `Iterable[IO]` to a single `IO`, working in up to `n` fibers in parallel.
 *
 * @ets_data_first reduceAllParN_
 */


function reduceAllParN(n, f, __trace) {
  return as => reduceAllParN_(as, n, f, __trace);
}
//# sourceMappingURL=reduceAll.js.map