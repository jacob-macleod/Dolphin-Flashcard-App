"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchSome = catchSome;
exports.catchSome_ = catchSome_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/core.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/core.js"));

var _core3 = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */
function catchSome(f, __trace) {
  return fa => catchSome_(fa, f, __trace);
}
/**
 * Recovers from some or all of the error cases.
 */


function catchSome_(fa, f, __trace) {
  return (0, _core3.foldCauseM_)(fa, cause => E.fold_(C.failureOrCause(cause), x => O.getOrElse_(f(x), () => (0, _core3.halt)(cause)), _core3.halt), _core3.succeed, __trace);
}
//# sourceMappingURL=catchSome.js.map