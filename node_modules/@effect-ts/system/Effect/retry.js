"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retry = retry;
exports.retryOrElse = retryOrElse;
exports.retryOrElseEither = retryOrElseEither;
exports.retryOrElseEither_ = retryOrElseEither_;
exports.retryOrElse_ = retryOrElse_;
exports.retry_ = retry_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Schedule/index.js"));

var catchAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAll.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var fail = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fail.js"));

var foldM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldM.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var orDie = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./orDie.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function loop(self, orElse, driver) {
  return catchAll.catchAll_(map.map_(self, a => E.right(a)), e => foldM.foldM_(driver.next(e), () => core.chain_(orDie.orDie(driver.last), o => map.map_(orElse(e, o), a => E.left(a))), () => loop(self, orElse, driver)));
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */


function retryOrElseEither_(self, policy, orElse, __trace) {
  return core.chain_(schedule.driver(policy), a => loop(self, orElse, a), __trace);
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 *
 * @ets_data_first retryOrElseEither_
 */


function retryOrElseEither(policy, orElse, __trace) {
  return self => retryOrElseEither_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */


function retryOrElse_(self, policy, orElse, __trace) {
  return map.map_(retryOrElseEither_(self, policy, orElse, __trace), E.fold(_index2.identity, _index2.identity));
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */


function retryOrElse(policy, orElse, __trace) {
  return self => retryOrElse_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */


function retry_(self, policy, __trace) {
  return retryOrElse_(self, policy, (e, _) => fail.fail(e), __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 *
 * @ets_data_first retry_
 */


function retry(policy, __trace) {
  return self => retry_(self, policy, __trace);
}
//# sourceMappingURL=retry.js.map