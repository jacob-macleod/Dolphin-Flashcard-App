// ets_tracing: off
import * as C from "../../../Cause/index.mjs";
import * as A from "../../../Collections/Immutable/Chunk/index.mjs";
import { _A, _E } from "../../../Effect/commons.mjs";
import * as T from "../../../Effect/index.mjs";
import * as Ex from "../../../Exit/index.mjs";
import * as O from "../../../Option/index.mjs";
/**
 * A `Take<E, A>` represents a single `take` from a queue modeling a stream of
 * values. A `Take` may be a failure cause `Cause<E>`, an chunk value `A`
 * or an end-of-stream marker.
 */

export class Take {
  constructor(exit) {
    this.exit = exit;
  }

}
/**
 * Transforms `Take[E, A]` to `Effect[R, E, B]`.
 */

export function done(self) {
  return T.done(self.exit);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */

export function fold_(self, end, error, value) {
  return Ex.fold_(self.exit, _ => O.fold_(C.flipCauseOption(_), () => end, error), value);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 *
 * @ets_data_first fold_
 */

export function fold(end, error, value) {
  return self => fold_(self, end, error, value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */

export function foldEffect_(self, end, error, value) {
  return Ex.foldM_(self.exit, _ => O.fold_(C.flipCauseOption(_), () => end, error), value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 *
 * @ets_data_first foldEffect_
 */

export function foldEffect(end, error, value) {
  return self => foldEffect_(self, end, error, value);
}
/**
 * Checks if this `take` is done (`Take.end`).
 */

export function isDone(self) {
  return Ex.fold_(self.exit, _ => O.isNone(C.flipCauseOption(_)), _ => false);
}
/**
 * Checks if this `take` is a failure.
 */

export function isFailure(self) {
  return Ex.fold_(self.exit, _ => O.isSome(C.flipCauseOption(_)), _ => false);
}
/**
 * Checks if this `take` is a success.
 */

export function isSuccess(self) {
  return Ex.fold_(self.exit, _ => false, _ => true);
}
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 */

export function map_(self, f) {
  return new Take(Ex.map_(self.exit, A.map(f)));
}
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 */

export function tap_(self, f) {
  return T.asUnit(Ex.forEach_(self.exit, f));
}
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return self => tap_(self, f);
}
/**
 * Creates a `Take<never, A>` with a singleton chunk.
 */

export function single(a) {
  return new Take(Ex.succeed(A.single(a)));
}
/**
 * Creates a `Take[Nothing, A]` with the specified chunk.
 */

export function chunk(as) {
  return new Take(Ex.succeed(as));
}
/**
 * Creates a failing `Take<E, unknown>` with the specified failure.
 */

export function fail(e) {
  return new Take(Ex.fail(O.some(e)));
}
/**
 * Creates a failing `Take[E, Nothing]` with the specified cause.
 */

export function failCause(c) {
  return new Take(Ex.failCause(C.map_(c, O.some)));
}
/**
 * Creates an effect from `Effect<R, E,A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`. Creates a singleton chunk.
 */

export function fromEffect(effect) {
  return T.foldCause_(effect, cause => halt(cause), single);
}
/**
 * Creates effect from `Pull<R, E, A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`, end of stream to `Take.end`.
 */

export function fromPull(pull) {
  return T.foldCause_(pull, _ => O.fold_(C.flipCauseOption(_), () => end, halt), chunk);
}
/**
 * Creates a failing `Take<E, never>` with the specified cause.
 */

export function halt(c) {
  return new Take(Ex.halt(C.map_(c, O.some)));
}
/**
 * Creates a failing `Take<never, never>` with the specified throwable.
 */

export function die(e) {
  return new Take(Ex.die(e));
}
/**
 * Creates a failing `Take<never, never>` with the specified error message.
 */

export function dieMessage(msg) {
  return new Take(Ex.die(new C.RuntimeError(msg)));
}
/**
 * Creates a `Take<E, A>` from `Exit<E, A>`.
 */

export function fromExit(exit) {
  return new Take(Ex.map_(Ex.mapError_(exit, O.some), A.single));
}
/**
 * End-of-stream marker
 */

export const end = /*#__PURE__*/new Take( /*#__PURE__*/Ex.fail(O.none));
//# sourceMappingURL=index.mjs.map