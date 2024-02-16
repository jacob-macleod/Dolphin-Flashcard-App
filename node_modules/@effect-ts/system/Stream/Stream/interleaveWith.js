"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interleaveWith = interleaveWith;
exports.interleaveWith_ = interleaveWith_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/BufferedPull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _combine = /*#__PURE__*/require("./combine.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function loop(leftDone, rightDone, s, left, right) {
  return T.foldCauseM_(s, _ => O.fold_(C.sequenceCauseOption(_), () => T.succeed(Ex.fail(O.none)), e => T.succeed(Ex.halt(C.map_(e, O.some)))), b => {
    if (b && !leftDone) {
      return T.foldCauseM_(left, _ => O.fold_(C.sequenceCauseOption(_), () => {
        if (rightDone) {
          return T.succeed(Ex.fail(O.none));
        } else {
          return loop(true, rightDone, s, left, right);
        }
      }, e => T.succeed(Ex.halt(C.map_(e, O.some)))), a => T.succeed(Ex.succeed(Tp.tuple(a, Tp.tuple(leftDone, rightDone, s)))));
    } else if (!b && !rightDone) {
      return T.foldCauseM_(right, _ => O.fold_(C.sequenceCauseOption(_), () => {
        if (leftDone) {
          return T.succeed(Ex.fail(O.none));
        } else {
          return loop(leftDone, true, s, left, right);
        }
      }, e => T.succeed(Ex.halt(C.map_(e, O.some)))), a => T.succeed(Ex.succeed(Tp.tuple(a, Tp.tuple(leftDone, rightDone, s)))));
    } else {
      return loop(leftDone, rightDone, s, left, right);
    }
  });
}
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */


function interleaveWith_(self, that, b) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "sides", () => M.mapM_(b.proc, BP.make)), "result", ({
    sides
  }) => (0, _combine.combine_)(self, that, Tp.tuple(false, false, BP.pullElement(sides)), ({
    tuple: [leftDone, rightDone, sides]
  }, left, right) => {
    return loop(leftDone, rightDone, sides, left, right);
  }).proc), ({
    result
  }) => result));
}
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 *
 * @ets_data_first interleaveWith_
 */


function interleaveWith(that, b) {
  return self => interleaveWith_(self, that, b);
}
//# sourceMappingURL=interleaveWith.js.map