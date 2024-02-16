// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
export function filter(f) {
  return self => filter_(self, f);
}
export function filter_(self, f) {
  return mapChunks_(self, A.filter(f));
}
//# sourceMappingURL=filter.mjs.map