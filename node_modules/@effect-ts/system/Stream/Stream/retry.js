"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retry = retry;
exports.retry_ = retry_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */
function retry_(self, schedule) {
  return new _definitions.Stream(M.map_(M.let_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "driver", () => T.toManaged(SC.driver(schedule))), "currStream", () => T.toManaged(Ref.makeRef(Pull.end))), "switchStream", () => M.switchable()), ({
    currStream,
    switchStream
  }) => T.toManaged(T.chain_(switchStream(self.proc), currStream.set))), "pull", ({
    currStream,
    driver,
    switchStream
  }) => {
    const loop = T.catchSome_(T.flatten(currStream.get), O.fold(() => O.none, e => O.some(T.foldM_(driver.next(e), _ => Pull.fail(e), _ => T.zipRight_(T.chain_(switchStream(self.proc), currStream.set), T.tap_(loop, _ => driver.reset))))));
    return loop;
  }), ({
    pull
  }) => pull));
}
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */


function retry(schedule) {
  return self => retry_(self, schedule);
}
//# sourceMappingURL=retry.js.map