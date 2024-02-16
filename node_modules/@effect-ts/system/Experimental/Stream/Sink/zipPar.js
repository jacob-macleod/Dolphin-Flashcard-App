"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipPar = zipPar;
exports.zipPar_ = zipPar_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Array/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var ZipWithPar = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWithPar.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */
function zipPar_(...[s1, s2, ...sinks]) {
  const init = ZipWithPar.zipWithPar_(s1, s2, Tp.tuple); // @ts-expect-error

  return A.reduce_(sinks, init, (acc, v) => // @ts-expect-error
  ZipWithPar.zipWithPar_(acc, v, (a, b) => Tp.append_(a, b)));
}
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 *
 * @ets_data_first zipPar_
 */


function zipPar(...[s1, ...sinks]) {
  return self => zipPar_(self, s1, ...sinks);
}
//# sourceMappingURL=zipPar.js.map