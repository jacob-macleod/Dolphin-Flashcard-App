import { pipe } from "../../Function/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as SM from "../../Semaphore/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import * as chain from "./chain.mjs";
import { Stream } from "./definitions.mjs";
import * as forEach from "./forEach.mjs";
import { managed } from "./managed.mjs";
import * as tap from "./tap.mjs";
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `outputBuffer` elements of the produced streams may be
 * buffered in memory by this operator.
 */

export function chainPar(n, outputBuffer = 16) {
  return f => self => {
    return new Stream(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "out", () => T.toManagedRelease_(Q.makeBounded(outputBuffer), Q.shutdown)), "permits", () => T.toManaged(SM.makeSemaphore(n))), "innerFailure", () => T.toManaged(P.make())), ({
      innerFailure,
      out,
      permits
    }) => M.fork(M.foldCauseM_(forEach.forEachManaged_(self, a => T.asUnit(T.tap_(T.tap_(T.let_(T.bind_(T.do, "latch", () => P.make()), "innerStream", ({
      latch
    }) => T.foldCauseM_(forEach.forEachChunk(b => T.asUnit(Q.offer_(out, T.succeed(b))))(chain.chain(_ => f(a))(tap.tap(_ => P.succeed_(latch, undefined))(managed(SM.withPermitManaged(permits))))), cause => T.asUnit(T.zipRight_(Q.offer_(out, Pull.halt(cause)), P.fail_(innerFailure, cause))), _ => T.unit)), ({
      innerStream
    }) => T.fork(innerStream)), ({
      latch
    }) => P.await(latch)))), cause => T.toManaged(T.zipRight_(T.chain_(getChildren, c => F.interruptAll(c)), T.asUnit(Q.offer_(out, Pull.halt(cause))))), _ => T.toManaged(T.raceWith_(T.interruptible(P.await(innerFailure)), SM.withPermits_(T.interruptible(T.unit), permits, n), (_, permitsAcquisition) => T.zipRight_(T.chain_(getChildren, c => F.interruptAll(c)), T.asUnit(F.interrupt(permitsAcquisition))), (_, failureAwait) => T.zipRight_(Q.offer_(out, Pull.end), T.asUnit(F.interrupt(failureAwait)))))))), ({
      out
    }) => T.flatten(Q.take(out)))));
  };
}
//# sourceMappingURL=chainPar.mjs.map