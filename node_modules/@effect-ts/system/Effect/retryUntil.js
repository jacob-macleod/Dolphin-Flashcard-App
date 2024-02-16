"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryUntil = retryUntil;
exports.retryUntilM = retryUntilM;
exports.retryUntilM_ = retryUntilM_;
exports.retryUntil_ = retryUntil_;

var _index = /*#__PURE__*/require("../Function/index.js");

var catchAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAll.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var fail = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fail.js"));

var _zips = /*#__PURE__*/require("./zips.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 *
 * @ets_data_first retryUtilM_
 */
function retryUntilM(f, __trace) {
  return self => retryUntilM_(self, f);
}
/**
 * Retries this effect until its error satisfies the specified effectful predicate.
 */


function retryUntilM_(self, f, __trace) {
  return core.suspend(() => catchAll.catchAll_(self, e => core.chain_(f(e), b => b ? fail.fail(e) : (0, _zips.zipRight_)(core.yieldNow, retryUntilM_(self, f)))), __trace);
}
/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @ets_data_first retryUntil_
 */


function retryUntil(f, __trace) {
  return self => retryUntil_(self, f, __trace);
}
/**
 * Retries this effect until its error satisfies the specified predicate.
 */


function retryUntil_(self, f, __trace) {
  return retryUntilM_(self, a => core.succeed(f(a)), __trace);
}
//# sourceMappingURL=retryUntil.js.map