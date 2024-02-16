"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutTo = timeoutTo;
exports.timeoutTo_ = timeoutTo_;

var _index = /*#__PURE__*/require("../Function/index.js");

var as = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./as.js"));

var interruption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruption.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var race = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./race.js"));

var sleep = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./sleep.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value; and or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect
 * will be safely interrupted
 *
 * @ets_data_first timeoutTo_
 */
function timeoutTo(d, b, f, __trace) {
  return self => timeoutTo_(self, d, b, f);
}
/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value; and or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect
 * will be safely interrupted
 */


function timeoutTo_(self, d, b, f, __trace) {
  return race.raceFirst_(map.map_(self, f), as.as_(interruption.interruptible(sleep.sleep(d)), b), __trace);
}
//# sourceMappingURL=timeoutTo.js.map