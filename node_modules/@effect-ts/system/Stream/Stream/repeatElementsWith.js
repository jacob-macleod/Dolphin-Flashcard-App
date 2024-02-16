"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatElementsWith = repeatElementsWith;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BufferedPull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

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
function repeatElementsWith(schedule) {
  return (f, g) => self => new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, _ => BP.make(_))), "driver", () => T.toManaged(SC.driver(schedule))), "state", () => T.toManaged(Ref.makeRef(O.none))), "pull", ({
    as,
    driver,
    state
  }) => {
    const go = T.chain_(state.get, O.fold(() => T.chain_(BP.pullElement(as), o => T.as_(state.set(O.some(o)), A.single(f(o)))), o => {
      const advance = T.as_(driver.next(o), A.single(f(o)));
      const reset = T.zipLeft_(T.zipLeft_(T.map_(T.orDie(driver.last), b => A.single(g(b))), driver.reset), state.set(O.none));
      return T.orElse_(advance, () => reset);
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=repeatElementsWith.js.map