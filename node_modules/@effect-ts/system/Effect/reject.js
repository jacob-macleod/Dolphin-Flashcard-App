"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reject = reject;
exports.rejectM = rejectM;
exports.rejectM_ = rejectM_;
exports.reject_ = reject_;

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */
function rejectM(pf, __trace) {
  return self => rejectM_(self, pf, __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */


function rejectM_(self, pf, __trace) {
  return (0, _core.chain_)(self, a => O.fold_(pf(a), () => (0, _core.succeed)(a), _ => (0, _core.chain_)(_, e1 => (0, _fail.fail)(e1))), __trace);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */


function reject(pf, __trace) {
  return self => reject_(self, pf);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */


function reject_(self, pf, __trace) {
  return rejectM_(self, x => O.map_(pf(x), _fail.fail), __trace);
}
//# sourceMappingURL=reject.js.map