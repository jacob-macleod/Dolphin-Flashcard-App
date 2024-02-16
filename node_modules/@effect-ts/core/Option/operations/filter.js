"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;
exports.filter_ = filter_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Option"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Filter using predicate/refinement
 *
 * @ets_data_first filter_
 */
function filter(predicate) {
  return fa => filter_(fa, predicate);
}
/**
 * Filter using predicate/refinement
 */


function filter_(fa, predicate) {
  return O.isNone(fa) ? O.none : predicate(fa.value) ? fa : O.none;
}
//# sourceMappingURL=filter.js.map