import { environment } from "./environment.mjs";
import { zip_ } from "./zip.mjs";
/**
 * Propagates the success value to the second element of a tuple, but
 * passes the effect input `R` along unmodified as the first element
 * of the tuple.
 */

export function onSecond(self, __trace) {
  return zip_(environment(), self, __trace);
}
//# sourceMappingURL=onSecond.mjs.map