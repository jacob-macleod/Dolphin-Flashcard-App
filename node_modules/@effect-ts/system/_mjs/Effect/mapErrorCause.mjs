import { foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */

export function mapErrorCause_(self, f, __trace) {
  return foldCauseM_(self, c => halt(f(c)), succeed, __trace);
}
/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */

export function mapErrorCause(f, __trace) {
  return self => foldCauseM_(self, c => halt(f(c)), succeed, __trace);
}
//# sourceMappingURL=mapErrorCause.mjs.map