// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a single-valued stream from a managed resource
 */

export function managed(self) {
  return new C.Stream(CH.managedOut(M.map_(self, CK.single)));
}
//# sourceMappingURL=managed.mjs.map