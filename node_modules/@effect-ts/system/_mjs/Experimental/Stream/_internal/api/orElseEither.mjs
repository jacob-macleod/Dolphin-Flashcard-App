// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as Map from "./map.mjs";
import * as OrElse from "./orElse.mjs";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseEither_(self, that) {
  return OrElse.orElse_(Map.map_(self, E.left), Map.map_(that, E.right));
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseEither_
 */

export function orElseEither(that) {
  return self => orElseEither_(self, that);
}
//# sourceMappingURL=orElseEither.mjs.map