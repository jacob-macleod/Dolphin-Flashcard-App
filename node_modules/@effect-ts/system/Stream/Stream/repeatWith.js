"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatWith = repeatWith;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./../Pull/index.js"));

var _concat = /*#__PURE__*/require("./concat.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */
function repeatWith(schedule) {
  return (f, g) => self => new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "sdriver", () => T.toManaged(SC.driver(schedule))), "switchPull", () => M.switchable()), "currPull", ({
    switchPull
  }) => T.toManaged(T.chain_(switchPull((0, _map.map_)(self, f).proc), Ref.makeRef))), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    currPull,
    doneRef,
    sdriver,
    switchPull
  }) => {
    const go = T.chain_(doneRef.get, done => {
      if (done) {
        return Pull.end;
      } else {
        return T.foldM_(T.flatten(currPull.get), O.fold(() => {
          const scheduleOutput = T.map_(T.orDie(sdriver.last), g);
          const continue_ = T.zipRight_(T.tap_(T.zipRight_(sdriver.next(undefined), switchPull((0, _concat.concat_)((0, _map.map_)(self, f), (0, _fromEffect.fromEffect)(scheduleOutput)).proc)), _ => currPull.set(_)), go);
          const halt = T.zipRight_(doneRef.set(true), Pull.end);
          return T.orElse_(continue_, () => halt);
        }, e => T.fail(O.some(e))), _ => T.succeed(_));
      }
    });
    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=repeatWith.js.map