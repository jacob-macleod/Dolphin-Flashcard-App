import { AtomicReference } from "../Support/AtomicReference/index.mjs";
import { Promise } from "./promise.mjs";
import { Pending } from "./state.mjs";
export function unsafeMake(fiberId) {
  return new Promise(new AtomicReference(new Pending([])), [fiberId]);
}
//# sourceMappingURL=unsafeMake.mjs.map