"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unrefine = unrefine;
exports.unrefineWith = unrefineWith;
exports.unrefineWith_ = unrefineWith_;
exports.unrefine_ = unrefine_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/core.js"));

var _catchAllCause = /*#__PURE__*/require("./catchAllCause.js");

var _core2 = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes some fiber failures and converts them into errors.
 *
 * @ets_data_first unrefine_
 */
function unrefine(pf, __trace) {
  return fa => unrefine_(fa, pf, __trace);
}
/**
 * Takes some fiber failures and converts them into errors.
 */


function unrefine_(fa, pf, __trace) {
  return unrefineWith_(fa, pf, _index2.identity, __trace);
}
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 *
 * @ets_data_first unrefineWith_
 */


function unrefineWith(pf, f, __trace) {
  return fa => unrefineWith_(fa, pf, f, __trace);
}
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 */


function unrefineWith_(fa, pf, f, __trace) {
  return (0, _catchAllCause.catchAllCause_)(fa, cause => O.fold_(C.find(c => c._tag === "Die" ? pf(c.value) : O.none)(cause), () => (0, _core2.halt)(C.map(f)(cause)), _fail.fail), __trace);
}
//# sourceMappingURL=unrefine.js.map