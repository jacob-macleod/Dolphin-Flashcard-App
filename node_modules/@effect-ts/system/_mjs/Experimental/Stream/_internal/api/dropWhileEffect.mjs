import * as SK from "../../Sink/index.mjs";
import * as PipeThrough from "./pipeThrough.mjs";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * produces an effect that evalutates to `true`
 *
 * @see `dropWhile`
 */

export function dropWhileEffect_(self, f) {
  return PipeThrough.pipeThrough(self, SK.dropWhileEffect(f));
}
/**
 * Drops all elements of the stream for as long as the specified predicate
 * produces an effect that evalutates to `true`
 *
 * @see `dropWhile`
 *
 * @ets_data_first dropWhileEffect_
 */

export function dropWhileEffect(f) {
  return self => dropWhileEffect_(self, f);
}
//# sourceMappingURL=dropWhileEffect.mjs.map