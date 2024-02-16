// ets_tracing: off
import { chain_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Applicative's ap
 */

export function ap(fa, __trace) {
  return fab => ap_(fab, fa, __trace);
}
/**
 * Applicative's ap
 */

export function ap_(fab, fa, __trace) {
  return chain_(fab, ab => map_(fa, ab), __trace);
}
//# sourceMappingURL=ap.mjs.map