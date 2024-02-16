import { environment } from "./environment.mjs";
import { joinEither_ } from "./join.mjs";
/**
 * Returns this effect if environment is on the left, otherwise returns
 * whatever is on the right unmodified. Note that the result is lifted
 * in either.
 */

export function onLeft(__trace) {
  return self => joinEither_(self, environment(), __trace);
}
//# sourceMappingURL=onLeft.mjs.map