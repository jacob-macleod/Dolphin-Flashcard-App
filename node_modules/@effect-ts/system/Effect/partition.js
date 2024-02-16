"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partition = partition;
exports.partitionPar = partitionPar;
exports.partitionParN = partitionParN;
exports.partitionParN_ = partitionParN_;
exports.partitionPar_ = partitionPar_;
exports.partition_ = partition_;

var _index = /*#__PURE__*/require("../Function/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var _either = /*#__PURE__*/require("./either.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 *
 * @ets_data_first partition_
 */
function partition(f, __trace) {
  return as => partition_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a separated fashion.
 */


function partition_(as, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEach_)(as, a => (0, _either.either)(f(a)), __trace), I.partitionMap(_index.identity));
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * @ets_data_first partitionPar_
 */


function partitionPar(f, __trace) {
  return as => partitionPar_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 */


function partitionPar_(as, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachPar_)(as, a => (0, _either.either)(f(a)), __trace), I.partitionMap(_index.identity));
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first partitionParN_
 */


function partitionParN(n, f, __trace) {
  return as => partitionParN_(as, n, f, __trace);
}
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as
 * a tuple.
 *
 * Unlike `partitionPar`, this method will use at most up to `n` fibers.
 */


function partitionParN_(as, n, f, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachParN_)(as, n, a => (0, _either.either)(f(a)), __trace), I.partitionMap(_index.identity));
}
//# sourceMappingURL=partition.js.map