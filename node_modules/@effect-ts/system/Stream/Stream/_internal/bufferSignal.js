"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferSignal = bufferSignal;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Exit/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Pull/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Take/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * to the provided queue.
 */
function bufferSignal(self, queue) {
  return M.map_(M.let_(M.tap_(M.let_(M.bind_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "as", () => self.proc), "start", () => T.toManaged(P.make())), ({
    start
  }) => T.toManaged(P.succeed_(start, undefined))), "ref", ({
    start
  }) => T.toManaged(Ref.makeRef(start))), "done", () => T.toManaged(Ref.makeRef(false))), "upstream", ({
    as,
    ref
  }) => {
    const offer = take => Ex.fold_(take, _ => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "latch", () => ref.get), ({
      latch
    }) => P.await(latch)), "p", () => P.make()), ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      p
    }) => ref.set(p)), ({
      p
    }) => P.await(p))), _ => T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "added", ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      added,
      p
    }) => T.when_(ref.set(p), () => added))));

    return T.asUnit(T.repeatWhile_(T.tap_(Take.fromPull(as), take => offer(take)), _ => _ !== Take.end));
  }), ({
    upstream
  }) => M.fork(T.toManaged(upstream))), "pull", ({
    done
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(Q.take(queue), ({
        tuple: [take, p]
      }) => T.zipRight_(T.zipRight_(P.succeed_(p, undefined), T.when_(done.set(true), () => take === Take.end)), Take.done(take)));
    }
  })), ({
    pull
  }) => pull);
}
//# sourceMappingURL=bufferSignal.js.map