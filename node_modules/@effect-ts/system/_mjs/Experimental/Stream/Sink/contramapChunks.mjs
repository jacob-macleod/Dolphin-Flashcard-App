import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */

export function contramapChunks_(self, f) {
  const loop = CH.readWith(chunk => CH.zipRight_(CH.write(f(chunk)), loop), _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Sink(loop[">>>"](self.channel));
}
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 *
 * @ets_data_first contramapChunks_
 */

export function contramapChunks(f) {
  return self => contramapChunks_(self, f);
}
//# sourceMappingURL=contramapChunks.mjs.map