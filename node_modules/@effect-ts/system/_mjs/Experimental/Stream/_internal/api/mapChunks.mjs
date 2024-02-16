import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Transforms the chunks emitted by this stream.
 */

export function mapChunks_(self, f) {
  return new C.Stream(CH.mapOut_(self.channel, f));
}
/**
 * Transforms the chunks emitted by this stream.
 *
 * @ets_data_first mapChunks_
 */

export function mapChunks(f) {
  return self => mapChunks_(self, f);
}
//# sourceMappingURL=mapChunks.mjs.map