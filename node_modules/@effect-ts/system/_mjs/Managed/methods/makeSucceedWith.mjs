// ets_tracing: off
import { make_ } from "../core.mjs";
import { succeedWith } from "../deps-core.mjs";
/**
 * Lifts a synchronous effect that does not throw exceptions into a
 * `Managed<unknown, never, A>` with a release action. The acquire and
 * release actions will be performed uninterruptibly.
 */

export function makeSucceedWith(acquire, release, __trace) {
  return make_(succeedWith(acquire, __trace), a => succeedWith(() => release(a), __trace));
}
//# sourceMappingURL=makeSucceedWith.mjs.map