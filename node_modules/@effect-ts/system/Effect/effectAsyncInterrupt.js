"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectAsyncInterrupt = effectAsyncInterrupt;
exports.effectAsyncInterruptBlockingOn = effectAsyncInterruptBlockingOn;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _effectMaybeAsyncInterrupt = /*#__PURE__*/require("./effectMaybeAsyncInterrupt.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
function effectAsyncInterrupt(register, __trace) {
  return effectAsyncInterruptBlockingOn(register, [], __trace);
}
/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */


function effectAsyncInterruptBlockingOn(register, blockingOn, __trace) {
  return (0, _effectMaybeAsyncInterrupt.effectMaybeAsyncInterruptBlockingOn)(cb => E.left(register(cb)), blockingOn, __trace);
}
//# sourceMappingURL=effectAsyncInterrupt.js.map