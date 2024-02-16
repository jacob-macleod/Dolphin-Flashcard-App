// ets_tracing: off
import { chain_, succeedWith, suspend } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 *
 * @ets_data_first cond_
 */

export function cond(onTrue, onFalse, __trace) {
  return b => cond_(b, onTrue, onFalse, __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */

export function cond_(b, onTrue, onFalse, __trace) {
  return condM_(b, succeedWith(onTrue), succeedWith(onFalse), __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */

export function condM_(b, onTrue, onFalse, __trace) {
  return suspend(() => b ? onTrue : chain_(onFalse, x => fail(x)), __trace);
}
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */

export function condM(onTrue, onFalse, __trace) {
  return b => condM_(b, onTrue, onFalse, __trace);
}
//# sourceMappingURL=cond.mjs.map