"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatElementsWith = repeatElementsWith;
exports.repeatElementsWith_ = repeatElementsWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Schedule/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * This function accepts two conversion functions, which allow the output of this stream and the
 * output of the provided schedule to be unified into a single type. For example, `Either` or
 * similar data type.
 */
function repeatElementsWith_(self, schedule, f, g) {
  return new C.Stream(self.channel[">>>"](CH.unwrap(T.map_(T.bind_(T.do, "driver", () => SC.driver(schedule)), ({
    driver
  }) => {
    const feed = in_ => O.fold_(CK.head(in_), () => loop(), a => CH.zipRight_(CH.write(CK.single(f(a))), step(CK.drop_(in_, 1), a)));

    const step = (in_, a) => {
      const advance = T.as_(driver.next(a), CH.zipRight_(CH.write(CK.single(f(a))), step(in_, a)));
      const reset = T.map_(T.tap_(T.bind_(T.do, "b", () => T.orDie(driver.last)), () => driver.reset), ({
        b
      }) => CH.zipRight_(CH.write(CK.single(g(b))), feed(in_)));
      return CH.unwrap(T.orElse_(advance, () => reset));
    };

    const loop = () => CH.readWith(feed, _ => CH.fail(_), _ => CH.unit);

    return loop();
  }))));
}
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * This function accepts two conversion functions, which allow the output of this stream and the
 * output of the provided schedule to be unified into a single type. For example, `Either` or
 * similar data type.
 *
 * @ets_data_first repeatElementsWith_
 */


function repeatElementsWith(schedule, f, g) {
  return self => repeatElementsWith_(self, schedule, f, g);
}
//# sourceMappingURL=repeatElementsWith.js.map