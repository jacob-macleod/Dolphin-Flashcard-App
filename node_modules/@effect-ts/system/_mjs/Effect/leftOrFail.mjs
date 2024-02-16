// ets_tracing: off
import * as E from "../Either/index.mjs";
import { NoSuchElementException } from "../GlobalExceptions/index.mjs";
import * as O from "../Option/index.mjs";
import { chain_, succeed } from "./core.mjs";
import { fail, failWith } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */

export function leftOrFail_(self, orFail, __trace) {
  return chain_(self, E.fold(succeed, x => failWith(() => orFail(x))), __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */

export function leftOrFail(orFail, __trace) {
  return self => leftOrFail_(self, orFail, __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */

export function leftOrFailException(self, __trace) {
  return leftOrFail_(self, () => new NoSuchElementException(), __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */

export function left(self) {
  return foldM_(self, e => fail(O.some(e)), E.fold(succeed, () => fail(O.none)));
}
//# sourceMappingURL=leftOrFail.mjs.map