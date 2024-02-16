// ets_tracing: off
import { RuntimeError } from "../Cause/index.mjs";
import { pipe } from "../Function/index.mjs";
import { chain_, succeed, suspend } from "./core.mjs";
import { die } from "./die.mjs";
import { fail } from "./fail.mjs";
export function filterOrDie(p, dieWith, __trace) {
  return fa => filterOrDie_(fa, p, dieWith, __trace);
}
export function filterOrDie_(fa, p, dieWith, __trace) {
  return filterOrElse_(fa, p, x => die(dieWith(x)), __trace);
}
export function filterOrFail(p, failWith, __trace) {
  return fa => filterOrFail_(fa, p, failWith, __trace);
}
export function filterOrFail_(fa, p, failWith, __trace) {
  return filterOrElse_(fa, p, x => fail(failWith(x)), __trace);
}
export function filterOrElse(p, or, __trace) {
  return fa => filterOrElse_(fa, p, or, __trace);
}
export function filterOrElse_(fa, p, or, __trace) {
  return chain_(fa, a => p(a) ? succeed(a, __trace) : suspend(() => or(a), __trace));
}
export function filterOrDieMessage(p, message, __trace) {
  return fa => filterOrDieMessage_(fa, p, message, __trace);
}
export function filterOrDieMessage_(fa, p, message, __trace) {
  return filterOrDie_(fa, p, a => new RuntimeError(message(a)), __trace);
}
//# sourceMappingURL=filterOr.mjs.map