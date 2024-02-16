"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldM = foldM;
exports.foldM_ = foldM_;

var _index = /*#__PURE__*/require("../../Cause/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var _core = /*#__PURE__*/require("../core.js");

var _halt = /*#__PURE__*/require("./halt.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * @ets_data_first foldM_
 */
function foldM(failure, success, __trace) {
  return self => foldM_(self, failure, success, __trace);
}
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 */


function foldM_(self, failure, success, __trace) {
  return (0, _core.foldCauseM_)(self, x => E.fold_((0, _index.failureOrCause)(x), failure, _halt.halt), success, __trace);
}
//# sourceMappingURL=foldM.js.map