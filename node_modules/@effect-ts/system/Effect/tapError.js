"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapError = tapError;
exports.tapError_ = tapError_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 */
function tapError_(self, f, __trace) {
  return (0, _core.foldCauseM_)(self, c => E.fold_((0, _index.failureOrCause)(c), e => (0, _core.chain_)(f(e), () => (0, _core.halt)(c)), _ => (0, _core.halt)(c)), _core.succeed, __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @ets_data_first tapError_
 */


function tapError(f, __trace) {
  return self => tapError_(self, f, __trace);
}
//# sourceMappingURL=tapError.js.map