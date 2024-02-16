"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orDieKeep = orDieKeep;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var _core2 = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Converts all failures to unchecked exceptions
 */
function orDieKeep(effect, __trace) {
  return (0, _core2.foldCauseM_)(effect, ce => (0, _core2.halt)(Cause.chain(e => Cause.die(e))(ce)), _core2.succeed, __trace);
}
//# sourceMappingURL=orDieKeep.js.map