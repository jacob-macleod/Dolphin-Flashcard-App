// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as CatchAllCause from "./catchAllCause.mjs";
import * as FailCause from "./failCause.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 */

export function catchAll_(self, f) {
  return CatchAllCause.catchAllCause_(self, _ => E.fold_(CS.failureOrCause(_), f, _ => FailCause.failCause(_)));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with a typed error.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.mjs.map