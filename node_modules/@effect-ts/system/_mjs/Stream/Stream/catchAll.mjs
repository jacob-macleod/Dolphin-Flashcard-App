// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as E from "../../Either/index.mjs";
import { catchAllCause_ } from "./catchAllCause.mjs";
import { halt } from "./halt.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */

export function catchAll_(self, f) {
  return catchAllCause_(self, c => E.fold_(C.failureOrCause(c), f, halt));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */

export function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.mjs.map