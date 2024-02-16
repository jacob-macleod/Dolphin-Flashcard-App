"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatElements = repeatElements;
exports.repeatElements_ = repeatElements_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Collect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./collect.js"));

var RepeatElementsEither = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./repeatElementsEither.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */
function repeatElements_(self, schedule) {
  return Collect.collect_(RepeatElementsEither.repeatElementsEither_(self, schedule), E.fold(() => O.none, a => O.some(a)));
}
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * @ets_data_first repeatElements_
 */


function repeatElements(schedule) {
  return self => repeatElements_(self, schedule);
}
//# sourceMappingURL=repeatElements.js.map