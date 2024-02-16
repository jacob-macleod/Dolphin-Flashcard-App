"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutFail = timeoutFail;
exports.timeoutFail_ = timeoutFail_;

var Fail = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fail.js"));

var TimeoutTo = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./timeoutTo.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Fails the stream with given error if it does not produce a value after d duration.
 */
function timeoutFail_(self, e, d) {
  return TimeoutTo.timeoutTo_(self, d, Fail.fail(e));
}
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFail_
 */


function timeoutFail(e, d) {
  return self => timeoutFail_(self, e, d);
}
//# sourceMappingURL=timeoutFail.js.map