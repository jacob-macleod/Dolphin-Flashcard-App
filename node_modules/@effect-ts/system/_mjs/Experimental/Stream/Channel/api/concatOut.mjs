import * as ConcatAll from "./concatAll.mjs";
import * as MapOut from "./mapOut.mjs";
/**
 * Returns a new channel, which is the concatenation of all the channels that are written out by
 * this channel. This method may only be called on channels that output other channels.
 */

export function concatOut(self) {
  return ConcatAll.concatAll(MapOut.mapOut_(self, out => out));
}
//# sourceMappingURL=concatOut.mjs.map