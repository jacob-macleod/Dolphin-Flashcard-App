import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that ignores all of its inputs.
 */

export function drain() {
  const drain = CH.readWithCause(_ => drain, CH.failCause, _ => CH.unit);
  return new C.Sink(drain);
}
//# sourceMappingURL=drain.mjs.map