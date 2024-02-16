// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as C from "../core.mjs";
import * as ManagedOut from "./managedOut.mjs";
/**
 * Makes a channel from a managed that returns a channel in case of success
 */

export function unwrapManaged(self) {
  return C.concatAllWith_(ManagedOut.managedOut(self), identity, identity);
}
//# sourceMappingURL=unwrapManaged.mjs.map