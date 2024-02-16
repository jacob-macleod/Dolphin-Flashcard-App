import { environment } from "./environment.mjs";
import { joinEither_ } from "./join.mjs";
/**
 * Returns this effect if environment is on the right, otherwise returns
 * whatever is on the left unmodified. Note that the result is lifted
 * in either.
 */

export function onRight(__trace) {
  return self => joinEither_(environment(), self, __trace);
}
//# sourceMappingURL=onRight.mjs.map