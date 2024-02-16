"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runtime = runtime;

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/runtime.js"));

var _fromEffect = /*#__PURE__*/require("../fromEffect.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an Managed that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy
 * code that must call back into Effect code.
 */
function runtime(__trace) {
  return (0, _fromEffect.fromEffect)(R.runtime(), __trace);
}
//# sourceMappingURL=runtime.js.map