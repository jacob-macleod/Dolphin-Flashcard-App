"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interleaveWith = interleaveWith;
exports.interleaveWith_ = interleaveWith_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Take/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var HO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */
function interleaveWith_(self, that, b) {
  const producer = handoff => CH.readWithCause(value => CH.zipRight_(CH.fromEffect(HO.offer(handoff, TK.single(value))), producer(handoff)), cause => CH.fromEffect(HO.offer(handoff, TK.failCause(cause))), _ => CH.fromEffect(HO.offer(handoff, TK.end)));

  return new C.Stream(CH.managed_(M.map_(M.tap_(M.tap_(M.bind_(M.bind_(M.do, "left", () => T.toManaged(HO.make())), "right", () => T.toManaged(HO.make())), ({
    left
  }) => M.fork(CH.runManaged(CH.concatMap_(self.channel, _ => CH.writeChunk(_))[">>>"](producer(left))))), ({
    right
  }) => M.fork(CH.runManaged(CH.concatMap_(that.channel, _ => CH.writeChunk(_))[">>>"](producer(right))))), ({
    left,
    right
  }) => Tp.tuple(left, right)), ({
    tuple: [left, right]
  }) => {
    const process = (leftDone, rightDone) => CH.readWithCause(bool => {
      if (bool && !leftDone) {
        return CH.chain_(CH.fromEffect(HO.take(left)), TK.fold(rightDone ? CH.unit : process(true, rightDone), cause => CH.failCause(cause), chunk => CH.zipRight_(CH.write(chunk), process(leftDone, rightDone))));
      }

      if (!bool && !rightDone) {
        return CH.chain_(CH.fromEffect(HO.take(right)), TK.fold(leftDone ? CH.unit : process(leftDone, true), cause => CH.failCause(cause), chunk => CH.zipRight_(CH.write(chunk), process(leftDone, rightDone))));
      }

      return process(leftDone, rightDone);
    }, cause => CH.failCause(cause), _ => CH.unit);

    return CH.concatMap_(b.channel, _ => CH.writeChunk(_))[">>>"](process(false, false));
  }));
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