// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as ContramapChunksEffect from "./contramapChunksEffect.mjs";
/**
 * Effectfully transforms this sink's input elements.
 */

export function contramapEffect_(self, f) {
  return ContramapChunksEffect.contramapChunksEffect_(self, CK.mapEffect(f));
}
/**
 * Effectfully transforms this sink's input elements.
 *
 * @ets_data_first contramapEffect_
 */

export function contramapEffect(f) {
  return self => contramapEffect_(self, f);
}
//# sourceMappingURL=contramapEffect.mjs.map