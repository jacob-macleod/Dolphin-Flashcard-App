// ets_tracing: off
import { chain_ } from "./chain.mjs";
import { environment } from "./environment.mjs";
/**
 * Accesses the environment of the stream in the context of a stream.
 */

export function accessStream(f) {
  return chain_(environment(), f);
}
//# sourceMappingURL=accessStream.mjs.map