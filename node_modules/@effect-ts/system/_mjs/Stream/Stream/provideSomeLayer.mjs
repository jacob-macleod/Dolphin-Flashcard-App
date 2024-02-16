// ets_tracing: off
import * as L from "../../Layer/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { chain_ } from "./chain.mjs";
import { managed } from "./managed.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Provides a layer to the given effect
 */

export function provideSomeLayer(layer) {
  return self => provideLayer_(self, layer["+++"](L.identity()));
}
/**
 * Provides a layer to the given effect
 */

export function provideLayer_(self, layer) {
  return chain_(managed(M.gen(function* (_) {
    const r = yield* _(L.build(layer));
    const as = yield* _(M.provideAll_(self.proc, r));
    return T.provideAll_(as, r);
  })), repeatEffectChunkOption);
}
/**
 * Provides a layer to the given effect
 */

export function provideLayer(layer) {
  return self => provideLayer_(self, layer);
}
//# sourceMappingURL=provideSomeLayer.mjs.map