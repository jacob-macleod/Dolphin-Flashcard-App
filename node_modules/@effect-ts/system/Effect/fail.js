"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = fail;
exports.failWith = failWith;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/cause.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */
function fail(e, __trace) {
  return (0, _core.haltWith)(trace => C.traced(C.fail(e), trace()), __trace);
}
/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */


function failWith(e, __trace) {
  return (0, _core.haltWith)(trace => C.traced(C.fail(e()), trace()), __trace);
}
//# sourceMappingURL=fail.js.map