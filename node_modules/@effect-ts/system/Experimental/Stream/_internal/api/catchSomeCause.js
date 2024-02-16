"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchSomeCause = catchSomeCause;
exports.catchSomeCause_ = catchSomeCause_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CatchAllCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAllCause.js"));

var FailCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./failCause.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
function catchSomeCause_(self, pf) {
  return CatchAllCause.catchAllCause_(self, e => O.fold_(pf(e), () => FailCause.failCause(e), _ => _));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 *
 * @ets_data_first catchSomeCause_
 */


function catchSomeCause(pf) {
  return self => catchSomeCause_(self, pf);
}
//# sourceMappingURL=catchSomeCause.js.map