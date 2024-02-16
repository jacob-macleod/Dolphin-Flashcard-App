"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;
exports.repeatOrElse = repeatOrElse;
exports.repeatOrElseEither = repeatOrElseEither;
exports.repeatOrElseEither_ = repeatOrElseEither_;
exports.repeatOrElse_ = repeatOrElse_;
exports.repeat_ = repeat_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Schedule/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var _orDie = /*#__PURE__*/require("./orDie.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */
function repeatOrElseEither_(self, schedule, orElse, __trace) {
  return (0, _core.chain)(driver => {
    function loop(a) {
      return (0, _foldM.foldM)(() => map.map_((0, _orDie.orDie)(driver.last), E.right), b => (0, _foldM.foldM)(e => map.map_(orElse(e, O.some(b)), E.left), a => loop(a))(self))(driver.next(a));
    }

    return (0, _foldM.foldM)(e => map.map_(orElse(e, O.none), E.left), a => loop(a), __trace)(self);
  })(S.driver(schedule));
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElseEither_
 */


function repeatOrElseEither(schedule, orElse, __trace) {
  return self => repeatOrElseEither_(self, schedule, orElse, __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */


function repeatOrElse_(self, schedule, orElse, __trace) {
  return map.map_(repeatOrElseEither_(self, schedule, orElse, __trace), E.merge);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElse_
 */


function repeatOrElse(schedule, orElse, __trace) {
  return self => repeatOrElse_(self, schedule, orElse, __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 */


function repeat_(self, schedule, __trace) {
  return repeatOrElse_(self, schedule, e => (0, _fail.fail)(e), __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 *
 * @ets_data_first repeat_
 */


function repeat(schedule, __trace) {
  return self => repeat_(self, schedule, __trace);
}
//# sourceMappingURL=repeat.js.map