import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */

export function contramapChunksEffect_(self, f) {
  const loop = CH.readWith(chunk => CH.zipRight_(CH.chain_(CH.fromEffect(f(chunk)), CH.write), loop), _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Sink(loop[">>>"](self.channel));
}
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 *
 * @ets_data_first contramapChunksEffect_
 */

export function contramapChunksEffect(f) {
  return self => contramapChunksEffect_(self, f);
}
//# sourceMappingURL=contramapChunksEffect.mjs.map