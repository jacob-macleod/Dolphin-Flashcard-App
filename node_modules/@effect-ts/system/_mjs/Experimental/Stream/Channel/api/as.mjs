import * as Map from "./map.mjs";
/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 */

export function as_(self, z2) {
  return Map.map_(self, _ => z2);
}
/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 *
 * @ets_data_first as_
 */

export function as(z2) {
  return self => as_(self, z2);
}
//# sourceMappingURL=as.mjs.map