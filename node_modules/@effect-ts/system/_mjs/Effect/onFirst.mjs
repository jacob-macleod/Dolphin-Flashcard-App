import { environment } from "./environment.mjs";
import { zip_ } from "./zip.mjs";
/**
 * Propagates the success value to the first element of a tuple, but
 * passes the effect input `R` along unmodified as the second element
 * of the tuple.
 */

export function onFirst(self, __trace) {
  return zip_(self, environment(), __trace);
}
//# sourceMappingURL=onFirst.mjs.map