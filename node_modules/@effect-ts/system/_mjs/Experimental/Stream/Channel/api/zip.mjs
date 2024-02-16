// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as C from "../core.mjs";
import * as Map from "./map.mjs";
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with a tuple of the terminal values of both channels.
 */

export function zip_(self, that) {
  return C.chain_(self, z => Map.map_(that, z2 => Tp.tuple(z, z2)));
}
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with a tuple of the terminal values of both channels.
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return self => zip_(self, that);
}
//# sourceMappingURL=zip.mjs.map