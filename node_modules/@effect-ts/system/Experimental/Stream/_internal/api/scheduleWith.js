"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleWith = scheduleWith;
exports.scheduleWith_ = scheduleWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Schedule/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 */
function scheduleWith_(self, schedule, f, g) {
  const loop = (driver, chunk, index) => {
    if (index < CK.size(chunk)) {
      return CH.unwrap(T.suspend(() => {
        const a = CK.unsafeGet_(chunk, index);
        return T.foldM_(driver.next(a), () => T.zipLeft_(T.map_(T.orDie(driver.last), b => CH.zipRight_(CH.write(CK.make(f(a), g(b))), loop(driver, chunk, index + 1))), driver.reset), () => T.succeed(CH.zipRight_(CH.write(CK.single(f(a))), loop(driver, chunk, index + 1))));
      }));
    } else {
      return CH.readWithCause(chunk => loop(driver, chunk, 0), _ => CH.failCause(_), _ => CH.end(_));
    }
  };

  return new C.Stream(CH.chain_(CH.fromEffect(SC.driver(schedule)), _ => self.channel[">>>"](loop(_, CK.empty(), 0))));
}
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 *
 * @ets_data_first scheduleWith_
 */


function scheduleWith(schedule, f, g) {
  return self => scheduleWith_(self, schedule, f, g);
}
//# sourceMappingURL=scheduleWith.js.map