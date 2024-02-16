"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAllDefect = catchAllDefect;
exports.catchAllDefect_ = catchAllDefect_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _catchSomeDefect = /*#__PURE__*/require("./catchSomeDefect.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */
function catchAllDefect_(fa, f, __trace) {
  return (0, _catchSomeDefect.catchSomeDefect_)(fa, u => O.some(f(u)), __trace);
}
/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @ets_data_first catchAllDefect_
 */


function catchAllDefect(f, __trace) {
  return effect => catchAllDefect_(effect, f, __trace);
}
//# sourceMappingURL=catchAllDefect.js.map