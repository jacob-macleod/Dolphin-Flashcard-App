// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Map from "./map.mjs";
import * as Zip from "./zip.mjs";
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of the other channel.
 */

export function zipRight_(self, that) {
  return Map.map_(Zip.zip_(self, that), Tp.get(1));
}
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of the other channel.
 *
 * @ets_data_first zipRight_
 */

export function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=zipRight.mjs.map