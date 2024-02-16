// ets_tracing: off
import * as C from "../core.mjs";
/**
 * Returns a new channel which reads all the elements from upstream's output channel
 * and ignores them, then terminates with the upstream result value.
 */

export function drain(self) {
  const drainer = C.readWithCause(_ => drainer, C.failCause, C.end);
  return self[">>>"](drainer);
}
//# sourceMappingURL=drain.mjs.map