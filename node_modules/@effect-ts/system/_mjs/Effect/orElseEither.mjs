// ets_tracing: off
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { succeed, tryOrElse_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @ets_data_first orElseEither_
 */

export function orElseEither(that, __trace) {
  return self => orElseEither_(self, that, __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 */

export function orElseEither_(self, that, __trace) {
  return tryOrElse_(self, () => map_(that(), E.right), x => succeed(E.left(x)), __trace);
}
//# sourceMappingURL=orElseEither.mjs.map