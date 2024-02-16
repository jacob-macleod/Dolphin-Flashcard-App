// ets_tracing: off
import { access } from "./core.mjs";
/**
 * Access environment
 */

export function environment(__trace) {
  return access(_ => _, __trace);
}
//# sourceMappingURL=environment.mjs.map