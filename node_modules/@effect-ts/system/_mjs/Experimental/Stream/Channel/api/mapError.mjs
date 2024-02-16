// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as MapErrorCause from "./mapErrorCause.mjs";
/**
 * Returns a new channel, which is the same as this one, except the failure value of the returned
 * channel is created by applying the specified function to the failure value of this channel.
 */

export function mapError_(self, f) {
  return MapErrorCause.mapErrorCause_(self, cause => CS.map_(cause, f));
}
/**
 * Returns a new channel, which is the same as this one, except the failure value of the returned
 * channel is created by applying the specified function to the failure value of this channel.
 *
 * @ets_data_first mapError_
 */

export function mapError(f) {
  return self => mapError_(self, f);
}
//# sourceMappingURL=mapError.mjs.map