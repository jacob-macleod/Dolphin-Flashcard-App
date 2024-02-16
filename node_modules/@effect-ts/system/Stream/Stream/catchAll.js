"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _catchAllCause = /*#__PURE__*/require("./catchAllCause.js");

var _halt = /*#__PURE__*/require("./halt.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */
function catchAll_(self, f) {
  return (0, _catchAllCause.catchAllCause_)(self, c => E.fold_(C.failureOrCause(c), f, _halt.halt));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */


function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.js.map