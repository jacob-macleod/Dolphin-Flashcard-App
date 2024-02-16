"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptAfter = interruptAfter;
exports.interruptAfter_ = interruptAfter_;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Clock/index.js"));

var InterruptWhen = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruptWhen.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 */
function interruptAfter_(self, duration) {
  return InterruptWhen.interruptWhen_(self, CL.sleep(duration));
}
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 *
 * @ets_data_first interruptAfter_
 */


function interruptAfter(duration) {
  return self => interruptAfter_(self, duration);
}
//# sourceMappingURL=interruptAfter.js.map