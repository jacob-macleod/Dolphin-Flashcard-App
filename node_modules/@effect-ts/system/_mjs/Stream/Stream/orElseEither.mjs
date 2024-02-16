// ets_tracing: off
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { map_ } from "./map.mjs";
import { orElse } from "./orElse.mjs";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseEither_(self, that) {
  return orElse(map_(that, E.right))(map_(self, E.left));
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseEither(that) {
  return self => orElseEither_(self, that);
}
//# sourceMappingURL=orElseEither.mjs.map