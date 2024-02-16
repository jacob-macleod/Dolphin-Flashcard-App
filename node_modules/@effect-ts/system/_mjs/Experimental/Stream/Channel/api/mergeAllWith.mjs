// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as F from "../../../../Fiber/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as SM from "../../../../Semaphore/index.mjs";
import * as C from "../core.mjs";
import * as Managed from "./managed.mjs";
import * as ToPull from "./toPull.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as ZipRight from "./zipRight.mjs";
export function mergeAllWith_(channels, n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return Managed.managed_(M.withChildren(getChildren => M.map_(M.tap_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.tap_(M.do, () => M.finalizer(T.chain_(getChildren, F.interruptAll))), "queue", () => T.toManagedRelease_(Q.makeBounded(bufferSize), Q.shutdown)), "cancelers", () => T.toManagedRelease_(Q.makeUnbounded(), Q.shutdown)), "lastDone", () => Ref.makeManagedRef(O.none)), "errorSignal", () => P.makeManaged()), "permits", () => T.toManaged(SM.makeSemaphore(n))), "pull", () => ToPull.toPull(channels)), "evaluatePull", ({
    errorSignal,
    lastDone,
    queue
  }) => pull => T.catchAllCause_(T.chain_(T.repeatUntil_(T.chain_(pull, E.fold(done => T.succeed(O.some(done)), outElem => T.as_(Q.offer_(queue, T.succeed(E.right(outElem))), O.none))), O.isSome), O.fold(() => T.unit, outDone => Ref.update_(lastDone, O.fold(() => O.some(outDone), lastDone => O.some(f(lastDone, outDone)))))), cause => T.zipRight_(Q.offer_(queue, T.halt(cause)), T.asUnit(P.succeed_(errorSignal, undefined))))), ({
    cancelers,
    errorSignal,
    evaluatePull,
    lastDone,
    permits,
    pull,
    queue
  }) => T.forkManaged(T.repeatWhile_(T.foldCauseM_(pull, cause => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.as_(Q.offer_(queue, T.halt(cause)), false)), E.fold(outDone => T.raceWith_(P.await(errorSignal), SM.withPermits_(T.unit, permits, n), (_, permitAcquisition) => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.as_(F.interrupt(permitAcquisition), false)), (_, failureAwait) => T.zipRight_(F.interrupt(failureAwait), T.as_(T.chain_(lastDone.get, O.fold(() => Q.offer_(queue, T.succeed(E.left(outDone))), lastDone => Q.offer_(queue, T.succeed(E.left(f(lastDone, outDone)))))), false))), channel => {
    if (mergeStrategy === "BackPressure") {
      return T.map_(T.bind_(T.tap_(T.tap_(T.let_(T.bind_(T.do, "latch", () => P.make()), "raceIOs", () => M.use_(ToPull.toPull(channel), _ => T.race_(evaluatePull(_), P.await(errorSignal)))), ({
        latch,
        raceIOs
      }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, undefined), raceIOs), permits))), ({
        latch
      }) => P.await(latch)), "errored", () => P.isDone(errorSignal)), ({
        errored
      }) => !errored);
    } else {
      return T.map_(T.bind_(T.tap_(T.tap_(T.let_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "canceler", () => P.make()), "latch", () => P.make()), "size", () => Q.size(cancelers)), ({
        size
      }) => T.when_(T.chain_(Q.take(cancelers), _ => P.succeed_(_, undefined)), () => size >= n)), ({
        canceler
      }) => Q.offer_(cancelers, canceler)), "raceIOs", ({
        canceler
      }) => M.use_(ToPull.toPull(channel), _ => T.race_(T.race_(evaluatePull(_), P.await(errorSignal)), P.await(canceler)))), ({
        latch,
        raceIOs
      }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, undefined), raceIOs), permits))), ({
        latch
      }) => P.await(latch)), "errored", () => P.isDone(errorSignal)), ({
        errored
      }) => !errored);
    }
  })), x => x === true))), ({
    queue
  }) => queue)), queue => {
    const consumer = Unwrap.unwrap(T.foldCause_(T.flatten(Q.take(queue)), cause => C.failCause(cause), E.fold(outDone => C.end(outDone), outElem => ZipRight.zipRight_(C.write(outElem), consumer))));
    return consumer;
  });
}
/**
 * @ets_data_first mergeAllWith_
 */

export function mergeAllWith(n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return channels => mergeAllWith_(channels, n, f, bufferSize, mergeStrategy);
}
//# sourceMappingURL=mergeAllWith.mjs.map