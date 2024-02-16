// ets_tracing: off
import { squash } from "../Cause/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
import { sandbox } from "./sandbox.mjs";
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */

export function absorbWith(f, __trace) {
  return fa => absorbWith_(fa, f, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */

export function absorbWith_(fa, f, __trace) {
  return foldM_(sandbox(fa), x => fail(squash(f)(x)), succeed, __trace);
}
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */

export function absorb(self, __trace) {
  return absorbWith_(self, identity, __trace);
}
//# sourceMappingURL=absorbWith.mjs.map