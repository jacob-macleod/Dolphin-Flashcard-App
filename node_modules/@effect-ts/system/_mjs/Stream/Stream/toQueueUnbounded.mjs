// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { intoManaged_ } from "./intoManaged.mjs";
export function toQueueUnbounded(stream) {
  return M.tap_(T.toManagedRelease_(Q.makeUnbounded(), Q.shutdown), queue => M.fork(intoManaged_(stream, queue)));
}
//# sourceMappingURL=toQueueUnbounded.mjs.map