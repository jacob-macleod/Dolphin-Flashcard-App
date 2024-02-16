"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.struct = struct;
exports.structPar = structPar;
exports.structParN = structParN;
exports.structParN_ = structParN_;

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Dictionary/index.js"));

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applicative structure
 */
function struct(r, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEach_)(R.collect_(r, (k, v) => [k, v]), ([_, e]) => (0, _map.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * Applicative structure processed in parallel
 */


function structPar(r, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachPar_)(R.collect_(r, (k, v) => [k, v]), ([_, e]) => (0, _map.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * Applicative structure processed in parallel with up to N fibers
 *
 * @ets_data_first structParN_
 */


function structParN(n, __trace) {
  return r => // @ts-expect-error
  structParN_(r, n, __trace);
}
/**
 * Applicative structure processed in parallel with up to N fibers
 */


function structParN_(r, n, __trace) {
  return (0, _map.map_)((0, _exclForEach.forEachParN_)(R.collect_(r, (k, v) => [k, v]), n, ([_, e]) => (0, _map.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
//# sourceMappingURL=struct.js.map