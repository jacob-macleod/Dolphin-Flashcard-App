// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as F from "../../../../Fiber/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as MH from "../_internal/mergeHelpers.mjs";
import * as C from "../core.mjs";
import * as FromInput from "./fromInput.mjs";
import * as ToPull from "./toPull.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
import * as ZipRight from "./zipRight.mjs";
/**
 * Returns a new channel, which is the merge of this channel and the specified channel, where
 * the behavior of the returned channel on left or right early termination is decided by the
 * specified `leftDone` and `rightDone` merge decisions.
 */

export function mergeWith_(self, that, leftDone, rightDone) {
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

export function mergeWith(that, leftDone, rightDone) {
  return self => mergeWith_(self, that, leftDone, rightDone);
}
//# sourceMappingURL=mergeWith.mjs.map