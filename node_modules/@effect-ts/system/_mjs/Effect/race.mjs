// ets_tracing: off
import * as Cause from "../Cause/core.mjs";
import * as E from "../Either/index.mjs";
import * as Exit from "../Exit/api.mjs";
import * as Fiber from "../Fiber/core.mjs";
import { pipe } from "../Function/index.mjs";
import { as_ } from "./as.mjs";
import * as core from "./core.mjs";
import { raceWith_ } from "./core-scope.mjs";
import { done } from "./done.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
import { map_ } from "./map.mjs";
import { mapErrorCause_ } from "./mapErrorCause.mjs";
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired
 */

export function race_(self, that, __trace) {
  return core.descriptorWith(descriptor => {
    const parentFiberId = descriptor.id;

    const maybeDisconnect = io => uninterruptibleMask(interruptible => interruptible.force(io));

    return raceWith_(maybeDisconnect(self), maybeDisconnect(that), (exit, right) => Exit.foldM_(exit, cause => mapErrorCause_(Fiber.join(right), _ => Cause.combinePar(cause, _)), a => as_(right.interruptAs(parentFiberId), a)), (exit, left) => Exit.foldM_(exit, cause => mapErrorCause_(Fiber.join(left), _ => Cause.combinePar(_, cause)), a => as_(left.interruptAs(parentFiberId), a)), __trace);
  });
}
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first race_
 */

export function race(that, __trace) {
  return self => race_(self, that, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 */

export function raceEither_(self, that, __trace) {
  return race_(map_(self, E.left), map_(that, E.right), __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first raceEither_
 */

export function raceEither(that, __trace) {
  return self => raceEither_(self, that, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 */

export function raceFirst_(self, that, __trace) {
  return core.chain_(race_(core.result(self), core.result(that), __trace), a => done(a));
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 *
 * @ets_data_first raceFirst_
 */

export function raceFirst(that, __trace) {
  return self => raceFirst_(self, that, __trace);
}
//# sourceMappingURL=race.mjs.map