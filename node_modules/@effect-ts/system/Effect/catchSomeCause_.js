"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchSomeCause = catchSomeCause;
exports.catchSomeCause_ = catchSomeCause_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Recovers from some or all of the error cases with provided cause.
 */
function catchSomeCause_(effect, f, __trace) {
  return (0, _core.foldCauseM_)(effect, c => O.fold_(f(c), () => (0, _core.halt)(c), a => a), _core.succeed, __trace);
}
/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @ets_data_first catchSomeCause_
 */


function catchSomeCause(f, __trace) {
  return effect => catchSomeCause_(effect, f, __trace);
}
//# sourceMappingURL=catchSomeCause_.js.map