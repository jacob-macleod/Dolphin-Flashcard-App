// ets_tracing: off
import { NoSuchElementException } from "../GlobalExceptions/index.mjs";
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Lifts an Option into an Effect, if the option is not defined it fails with NoSuchElementException.
 */

export function getOrFail(v, __trace) {
  return O.fold_(v, () => fail(new NoSuchElementException(), __trace), x => succeed(x, __trace));
}
/**
 * Lifts an Option into a IO, if the option is not defined it fails with Unit.
 */

export function getOrFailUnit(v, __trace) {
  return O.fold_(v, () => fail(undefined, __trace), a => succeed(a, __trace));
}
//# sourceMappingURL=getOrFail.mjs.map