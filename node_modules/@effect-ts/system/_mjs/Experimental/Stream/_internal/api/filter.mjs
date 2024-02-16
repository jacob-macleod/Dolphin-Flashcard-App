// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as MapChunks from "./mapChunks.mjs";
export function filter_(self, f) {
  return MapChunks.mapChunks_(self, CK.filter(f));
}
export function filter(f) {
  return self => filter_(self, f);
}
//# sourceMappingURL=filter.mjs.map