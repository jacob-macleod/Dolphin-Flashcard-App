import { not } from "../../Function/index.mjs";
import { drop_ } from "./drop.mjs";
import { dropWhile_ } from "./dropWhile.mjs";
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */

export function dropUntil_(self, pred) {
  return drop_(dropWhile_(self, not(pred)), 1);
}
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */

export function dropUntil(pred) {
  return self => dropUntil_(self, pred);
}
//# sourceMappingURL=dropUntil.mjs.map