// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as ContramapChunks from "./contramapChunks.mjs";
export function filterInput_(self, p) {
  return ContramapChunks.contramapChunks_(self, CK.filter(p));
}
export function filterInput(p) {
  return self => filterInput_(self, p);
}
//# sourceMappingURL=filterInput.mjs.map