"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeWith = mergeWith;
exports.mergeWith_ = mergeWith_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index5 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/mergeHelpers.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var FromInput = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromInput.js"));

var ToPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./toPull.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

var UnwrapManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrapManaged.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel, which is the merge of this channel and the specified channel, where
 * the behavior of the returned channel on left or right early termination is decided by the
 * specified `leftDone` and `rightDone` merge decisions.
 */
function mergeWith_(self, that, leftDone, rightDone) {
  const m = M.map_(M.chain_(M.bind_(M.bind_(M.let_(M.bind_(M.do, "input", () => T.toManaged(C.makeSingleProducerAsyncInput())), "queueReader", ({
    input
  }) => FromInput.fromInput(input)), "pullL", ({
    queueReader
  }) => ToPull.toPull(queueReader[">>>"](self))), "pullR", ({
    queueReader
  }) => ToPull.toPull(queueReader[">>>"](that))), ({
    input,
    pullL,
    pullR,
    queueReader
  }) => T.toManaged(T.transplant(graft => T.succeed({
    input,
    pullL: graft(pullL),
    pullR: graft(pullR),
    queueReader
  })))), ({
    input,
    pullL,
    pullR
  }) => {
    const handleSide = (exit, fiber, pull) => (done, both, single) => {
      const onDecision = decision => {
        MH.concrete(decision);

        if (decision._typeId === MH.DoneTypeId) {
          return T.succeed(C.fromEffect(T.zipRight_(F.interrupt(fiber), decision.io)));
        } else {
          return T.map_(fiber.await, Ex.fold(cause => C.fromEffect(decision.f(Ex.halt(cause))), E.fold(z => C.fromEffect(decision.f(Ex.succeed(z))), elem => ZipRight.zipRight_(C.write(elem), go(single(decision.f))))));
        }
      };

      return Ex.fold_(exit, failure => onDecision(done(Ex.halt(failure))), E.fold(z => onDecision(done(Ex.succeed(z))), elem => T.map_(T.forkDaemon(pull), leftFiber => ZipRight.zipRight_(C.write(elem), go(both(leftFiber, fiber))))));
    };

    const go = state => {
      if (state._typeId === MH.BothRunningTypeId) {
        const lj = F.join(state.left);
        const rj = F.join(state.right);
        return Unwrap.unwrap(T.raceWith_(lj, rj, (leftEx, _) => handleSide(leftEx, state.right, pullL)(leftDone, (l, r) => new MH.BothRunning(l, r), _ => new MH.LeftDone(_)), (rightEx, _) => handleSide(rightEx, state.left, pullR)(rightDone, (l, r) => new MH.BothRunning(r, l), _ => new MH.RightDone(_))));
      } else if (state._typeId === MH.LeftDoneTypeId) {
        return Unwrap.unwrap(T.map_(T.result(pullR), Ex.fold(cause => C.fromEffect(state.f(Ex.halt(cause))), E.fold(z => C.fromEffect(state.f(Ex.succeed(z))), elem => ZipRight.zipRight_(C.write(elem), go(new MH.LeftDone(state.f)))))));
      } else {
        return Unwrap.unwrap(T.map_(T.result(pullL), Ex.fold(cause => C.fromEffect(state.f(Ex.halt(cause))), E.fold(z => C.fromEffect(state.f(Ex.succeed(z))), elem => ZipRight.zipRight_(C.write(elem), go(new MH.RightDone(state.f)))))));
      }
    };

    return C.embedInput_(C.chain_(C.fromEffect(T.zipWith_(T.forkDaemon(pullL), T.forkDaemon(pullR), (a, b) => new MH.BothRunning(a, b))), go), input);
  });
  return UnwrapManaged.unwrapManaged(m);
}
/**
 * Returns a new channel, which is the merge of this channel and the specified channel, where
 * the behavior of the returned channel on left or right early termination is decided by the
 * specified `leftDone` and `rightDone` merge decisions.
 *
 * @ets_data_first mergeWith_
 */


function mergeWith(that, leftDone, rightDone) {
  return self => mergeWith_(self, that, leftDone, rightDone);
}
//# sourceMappingURL=mergeWith.js.map