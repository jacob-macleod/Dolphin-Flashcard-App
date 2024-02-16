import * as CatchAll from "./catchAll.mjs";
/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 */

export function orElse_(self, that) {
  return CatchAll.catchAll_(self, _ => that);
}
/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 *
 * @ets_data_first orElse_
 */

export function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.mjs.map