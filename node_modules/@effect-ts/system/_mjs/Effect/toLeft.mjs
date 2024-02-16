// ets_tracing: off
import * as E from "../Either/core.mjs";
import { chain_, succeed, succeedWith } from "./core.mjs";
/**
 * Returns an effect with the value on the left part.
 */

export function toLeftWith(a, __trace) {
  return chain_(succeedWith(a), x => succeed(E.left(x)), __trace);
}
/**
 * Returns an effect with the value on the left part.
 */

export function toLeft(a, __trace) {
  return succeed(E.left(a), __trace);
}
//# sourceMappingURL=toLeft.mjs.map