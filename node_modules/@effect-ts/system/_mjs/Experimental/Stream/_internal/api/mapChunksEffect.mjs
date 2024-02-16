import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Effectfully transforms the chunks emitted by this stream.
 */

export function mapChunksEffect_(self, f) {
  return new C.Stream(CH.mapOutEffect_(self.channel, f));
}
/**
 * Effectfully transforms the chunks emitted by this stream.
 *
 * @ets_data_first mapChunksEffect_
 */

export function mapChunksEffect(f) {
  return self => mapChunksEffect_(self, f);
}
//# sourceMappingURL=mapChunksEffect.mjs.map