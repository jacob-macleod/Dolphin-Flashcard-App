// ets_tracing: off
import "../../Operator/index.mjs";
import * as C from "../../Cause/core.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as E from "../../Exit/api.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
export function chunk(as) {
  return E.succeed(as);
}
export function halt(cause) {
  return E.halt(C.map(O.some)(cause));
}
export const end = /*#__PURE__*/E.fail(O.none);
export function done(take) {
  return T.done(take);
}
export function fromPull(pull) {
  return T.foldCause_(pull, c => O.fold_(C.sequenceCauseOption(c), () => end, halt), chunk);
}
export function tap_(take, f) {
  return T.asUnit(E.forEach_(take, f));
}
export function tap(f) {
  return take => tap_(take, f);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */

export function fold_(take, end, error, value) {
  return E.fold_(take, x => O.fold_(C.sequenceCauseOption(x), () => end, error), value);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */

export function fold(end, error, value) {
  return take => fold_(take, end, error, value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */

export function foldM_(take, end, error, value) {
  return E.foldM_(take, x => O.fold_(C.sequenceCauseOption(x), end, error), value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */

export function foldM(end, error, value) {
  return take => foldM_(take, end, error, value);
}
export function map_(take, f) {
  return E.map_(take, A.map(f));
}
export function map(f) {
  return take => map_(take, f);
}
//# sourceMappingURL=index.mjs.map