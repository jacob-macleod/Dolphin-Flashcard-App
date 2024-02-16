"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = tuple;
exports.tuplePar = tuplePar;
exports.tupleParN = tupleParN;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../Tracing/index.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */
function tuple(...t) {
  return (0, _map.map_)((0, _exclForEach.collectAll)(t, (0, _index2.accessCallTrace)()), x => Tp.tuple(...x));
}
/**
 * Like sequenceT but parallel, same as `forEachPar` + `identity` with a tuple type
 *
 * @ets_trace call
 */


function tuplePar(...t) {
  return (0, _map.map_)((0, _exclForEach.collectAllPar)(t, (0, _index2.accessCallTrace)()), x => Tp.tuple(...x));
}
/**
 * Like sequenceTPar but uses at most n fibers concurrently,
 * same as `forEachParN` + `identity` with a tuple type
 */


function tupleParN(n) {
  return (
    /**
     * @ets_trace call
     */
    (...t) => (0, _map.map_)((0, _exclForEach.collectAllParN_)(t, n, (0, _index2.accessCallTrace)()), x => Tp.tuple(...x))
  );
}
//# sourceMappingURL=tuple.js.map