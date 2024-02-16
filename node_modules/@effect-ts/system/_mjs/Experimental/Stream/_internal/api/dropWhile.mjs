import * as SK from "../../Sink/index.mjs";
import * as PipeThrough from "./pipeThrough.mjs";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function dropWhile_(self, f) {
  return PipeThrough.pipeThrough(self, SK.dropWhile(f));
}
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 *
 * @ets_data_first dropWhile_
 */

export function dropWhile(f) {
  return self => dropWhile_(self, f);
}
//# sourceMappingURL=dropWhile.mjs.map