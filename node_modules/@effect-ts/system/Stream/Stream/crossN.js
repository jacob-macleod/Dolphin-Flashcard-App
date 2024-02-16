"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crossN = crossN;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Array/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _flattenTuples = /*#__PURE__*/require("./_internal/flattenTuples.js");

var _cross = /*#__PURE__*/require("./cross.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Composes the specified streams to create a cartesian product of elements
 * with a specified function. Subsequent streams would be run multiple times,
 * for every combination of elements in the prior streams.
 *
 * See also `Stream#zipN` for the more common point-wise variant.
 */
function crossN(...[s1, s2, ...streams]) {
  return f => {
    return (0, _map.map)(_ => f(...(0, _flattenTuples.flattenTuples)(_)))(A.reduce_(streams, (0, _cross.cross_)(s1, s2), _cross.cross_));
  };
}
//# sourceMappingURL=crossN.js.map