"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatWith = repeatWith;
exports.repeatWith_ = repeatWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Schedule/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */
function repeatWith_(self, schedule, f, g) {
  return Unwrap.unwrap(T.map_(T.bind_(T.do, "driver", () => SC.driver(schedule)), ({
    driver
  }) => {
    const scheduleOutput = T.map_(T.orDie(driver.last), g);
    const process = Map.map_(self, f).channel;
    const loop = CH.unwrap(T.fold_(driver.next(undefined), _ => CH.unit, _ => CH.zipRight_(CH.zipRight_(process, CH.unwrap(T.map_(scheduleOutput, o => CH.write(CK.single(o))))), loop)));
    return new C.Stream(CH.zipRight_(process, loop));
  }));
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 *
 * @ets_data_first repeatWith_
 */


function repeatWith(schedule, f, g) {
  return self => repeatWith_(self, schedule, f, g);
}
//# sourceMappingURL=repeatWith.js.map