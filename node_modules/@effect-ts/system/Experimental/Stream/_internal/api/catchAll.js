"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var CatchAllCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAllCause.js"));

var FailCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./failCause.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */
function catchAll_(self, f) {
  return CatchAllCause.catchAllCause_(self, _ => E.fold_(CS.failureOrCause(_), f, _ => FailCause.failCause(_)));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 *
 * @ets_data_first catchAll_
 */


function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.js.map