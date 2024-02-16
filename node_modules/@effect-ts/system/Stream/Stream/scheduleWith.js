"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleWith = scheduleWith;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/BufferedPull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 */
function scheduleWith(schedule) {
  return (f, g) => self => {
    return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, BP.make)), "driver", () => T.toManaged(SC.driver(schedule))), "pull", ({
      as,
      driver
    }) => T.chain_(BP.pullElement(as), o => T.orElse_(T.as_(driver.next(o), A.single(f(o))), () => T.zipLeft_(T.map_(T.orDie(driver.last), b => A.append_(A.single(f(o)), g(b))), driver.reset)))), ({
      pull
    }) => pull));
  };
}
//# sourceMappingURL=scheduleWith.js.map