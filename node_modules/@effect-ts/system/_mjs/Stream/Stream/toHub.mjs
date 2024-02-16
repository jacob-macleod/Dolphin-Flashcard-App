// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as H from "../../Hub/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { intoHubManaged_ } from "./intoHubManaged.mjs";
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */

export function toHub_(self, capacity) {
  return M.tap_(T.toManagedRelease_(H.makeBounded(capacity), _ => H.shutdown(_)), hub => M.fork(intoHubManaged_(self, hub)));
}
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */

export function toHub(capacity) {
  return self => toHub_(self, capacity);
}
//# sourceMappingURL=toHub.mjs.map