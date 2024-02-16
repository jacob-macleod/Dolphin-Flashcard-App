"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summarized = summarized;
exports.summarized_ = summarized_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

var D = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 */
function summarized_(self, summary, f, __trace) {
  return (0, _core.suspend)(() => map.map_(D.bind_(D.bind_(D.bind_(D.do, "start", () => summary), "value", () => self), "end", () => summary), s => Tp.tuple(f(s.start, s.end), s.value)), __trace);
}
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @ets_data_first summarized_
 */


function summarized(summary, f, __trace) {
  return self => summarized_(self, summary, f, __trace);
}
//# sourceMappingURL=summarized.js.map