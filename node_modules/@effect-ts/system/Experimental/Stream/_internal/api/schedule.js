"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schedule = schedule;
exports.schedule_ = schedule_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Collect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collect.js"));

var ScheduleEither = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./scheduleEither.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Schedules the output of the stream using the provided `schedule`.
 */
function schedule_(self, schedule) {
  return Collect.collect_(ScheduleEither.scheduleEither_(self, schedule), E.fold(_ => O.none, r => O.some(r)));
}
/**
 * Schedules the output of the stream using the provided `schedule`.
 *
 * @ets_data_first schedule_
 */


function schedule(schedule) {
  return self => schedule_(self, schedule);
}
//# sourceMappingURL=schedule.js.map