"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapN = mapN;
exports.mapNPar = mapNPar;
exports.mapNParN = mapNParN;
exports.mapNParN_ = mapNParN_;
exports.mapNPar_ = mapNPar_;
exports.mapN_ = mapN_;

var _map = /*#__PURE__*/require("./map.js");

var _tuple = /*#__PURE__*/require("./tuple.js");

/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 *
 * @ets_data_first mapN_
 */
function mapN(f, __trace) {
  return t => mapN_(t, f, __trace);
}
/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 */


function mapN_(t, f, __trace) {
  // @ts-expect-error
  return (0, _map.map_)((0, _tuple.tuple)(...t.tuple), x => f(...x.tuple), __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * @ets_data_first mapNPar_
 */


function mapNPar(f, __trace) {
  return t => mapNPar_(t, f, __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 */


function mapNPar_(t, f, __trace) {
  // @ts-expect-error
  return (0, _map.map_)((0, _tuple.tuplePar)(...t.tuple), x => f(...x.tuple), __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */


function mapNParN(n, f, __trace) {
  return t => mapNParN_(t, n, f, __trace);
}
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */


function mapNParN_(t, n, f, __trace) {
  // @ts-expect-error
  return (0, _map.map_)((0, _tuple.tupleParN)(n)(...t.tuple), x => f(...x.tuple), __trace);
}
//# sourceMappingURL=mapN.js.map