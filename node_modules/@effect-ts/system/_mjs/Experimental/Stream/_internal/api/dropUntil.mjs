import * as Drop from "./drop.mjs";
import * as DropWhile from "./dropWhile.mjs";
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */

export function dropUntil_(self, f) {
  return Drop.drop_(DropWhile.dropWhile_(self, _ => !f(_)), 1);
}
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 *
 * @ets_data_first dropUntil_
 */

export function dropUntil(f) {
  return self => dropUntil_(self, f);
}
//# sourceMappingURL=dropUntil.mjs.map