// ets_tracing: off
import * as M from "../../../Managed/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a sink produced from a managed effect.
 */

export function unwrapManaged(managed) {
  return new C.Sink(CH.unwrapManaged(M.map_(managed, _ => _.channel)));
}
//# sourceMappingURL=unwrapManaged.mjs.map