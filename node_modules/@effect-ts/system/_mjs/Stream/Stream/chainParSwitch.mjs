import { pipe } from "../../Function/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as SM from "../../Semaphore/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
import * as forEach from "./forEach.mjs";
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 */

export function chainParSwitch(n, f, bufferSize = 16) {
  return self => {
    return new Stream(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "out", () => T.toManagedRelease_(Q.makeBounded(bufferSize), Q.shutdown)), "permits", () => T.toManaged(SM.makeSemaphore(n))), "innerFailure", () => T.toManaged(P.make())), "cancelers", () => T.toManagedRelease_(Q.makeBounded(n), Q.shutdown)), ({
      cancelers,
      innerFailure,
      out,
      permits
    }) => M.fork(M.foldCauseM_(forEach.forEachManaged_(self, a => T.asUnit(T.tap_(T.tap_(T.let_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "canceler", () => P.make()), "latch", () => P.make()), "size", () => Q.size(cancelers)), ({
      size
    }) => {
      if (size < n) {
        return T.unit;
      } else {
        return T.chain_(Q.take(cancelers), _ => P.succeed_(_, undefined));
      }
    }), ({
      canceler
    }) => Q.offer_(cancelers, canceler)), "innerStream", ({
      latch
    }) => M.use_(M.tap_(SM.withPermitManaged(permits), _ => T.toManaged(P.succeed_(latch, undefined))), () => T.foldCauseM_(forEach.forEachChunk(o2s => Q.offer_(out, T.succeed(o2s)))(f(a)), cause => T.zipRight_(Q.offer_(out, Pull.halt(cause)), P.fail_(innerFailure, cause)), _ => T.unit))), ({
      canceler,
      innerStream
    }) => T.fork(T.race_(innerStream, P.await(canceler)))), ({
      latch
    }) => P.await(latch)))), cause => T.toManaged(T.zipRight_(T.chain_(getChildren, _ => F.interruptAll(_)), Q.offer_(out, Pull.halt(cause)))), _ => T.toManaged(T.raceWith_(P.await(innerFailure), SM.withPermits_(T.unit, permits, n), (_, permitAcquisition) => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.asUnit(F.interrupt(permitAcquisition))), (_, failureAwait) => T.zipRight_(Q.offer_(out, Pull.end), F.interrupt(failureAwait))))))), ({
      out
    }) => T.flatten(Q.take(out)))));
  };
}
//# sourceMappingURL=chainParSwitch.mjs.map