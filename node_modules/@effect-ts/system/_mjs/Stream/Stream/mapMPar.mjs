// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as SM from "../../Semaphore/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
import { forEachManaged } from "./forEach.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. Transformed elements
 * will be emitted in the original order.
 */

export function mapMPar(n) {
  return f => self => new Stream(M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "out", () => M.fromEffect(Q.makeBounded(n))), "errorSignal", () => M.fromEffect(P.make())), "permits", () => M.fromEffect(SM.makeSemaphore(n))), ({
    errorSignal,
    out,
    permits
  }) => M.fork(M.foldCauseM_(forEachManaged(a => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "latch", () => P.make()), ({
    p
  }) => Q.offer_(out, T.mapError_(P.await(p), O.some))), ({
    latch,
    p
  }) => T.fork(SM.withPermit_(T.chain_( // Make sure we start evaluation before moving on to the next element
  P.succeed(undefined)(latch), () => // Transfer the result to the consuming stream
  T.to_( // Notify other tasks of a failure
  T.tapCause_( // Interrupt evaluation if another task fails
  T.raceFirst_(P.await(errorSignal), f(a)), e => P.halt(e)(errorSignal)), p)), permits))), ({
    latch
  }) => P.await(latch))))(self), c => M.fromEffect(Q.offer_(out, Pull.halt(c))), () => M.fromEffect(T.chain_(SM.withPermits_(T.unit, permits, n), () => Q.offer_(out, Pull.end)))))), ({
    out
  }) => T.map_(T.flatten(Q.take(out)), o => A.single(o))));
}
//# sourceMappingURL=mapMPar.mjs.map