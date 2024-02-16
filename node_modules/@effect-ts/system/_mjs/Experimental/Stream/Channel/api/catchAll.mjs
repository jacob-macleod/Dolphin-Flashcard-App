// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as C from "../core.mjs";
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 */

export function catchAll_(self, f) {
  return C.catchAllCause_(self, cause => E.fold_(CS.failureOrCause(cause), l => f(l), r => C.failCause(r)));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.mjs.map