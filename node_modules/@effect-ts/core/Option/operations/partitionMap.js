"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionMap = partitionMap;
exports.partitionMap_ = partitionMap_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Option"));

var _separate = /*#__PURE__*/require("./separate.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Partition + Map
 *
 * @ets_data_first partitionMap_
 */
function partitionMap(f) {
  return fa => partitionMap_(fa, f);
}
/**
 * Partition + Map
 */


function partitionMap_(fa, f) {
  return (0, _separate.separate)(O.map_(fa, f));
}
//# sourceMappingURL=partitionMap.js.map