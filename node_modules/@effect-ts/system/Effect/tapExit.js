"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapExit = tapExit;
exports.tapExit_ = tapExit_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 */
function tapExit_(self, f, __trace) {
  return (0, _core.foldCauseM_)(self, c => E.fold_((0, _index.failureOrCause)(c), e => (0, _core.chain_)(f(Ex.fail(e)), _ => (0, _core.halt)(c)), c => (0, _core.halt)(c)), a => (0, _core.chain_)(f(Ex.succeed(a)), _ => (0, _core.succeed)(a)), __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Exit`.
 *
 * @ets_data_first tapExit_
 */


function tapExit(f, __trace) {
  return self => tapExit_(self, f, __trace);
}
//# sourceMappingURL=tapExit.js.map