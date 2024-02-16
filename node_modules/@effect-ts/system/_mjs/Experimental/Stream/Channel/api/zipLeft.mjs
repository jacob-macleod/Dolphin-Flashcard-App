// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Map from "./map.mjs";
import * as Zip from "./zip.mjs";
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of this channel.
 */

export function zipLeft_(self, that) {
  return Map.map_(Zip.zip_(self, that), Tp.get(0));
}
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of this channel.
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.mjs.map