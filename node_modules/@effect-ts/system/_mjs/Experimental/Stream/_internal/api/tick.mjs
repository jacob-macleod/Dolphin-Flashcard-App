import * as SC from "../../../../Schedule/index.mjs";
import * as RepeatValueWith from "./repeatValueWith.mjs";
/**
 * A stream that emits Unit values spaced by the specified duration.
 */

export function tick(interval) {
  return RepeatValueWith.repeatValueWith(undefined, SC.spaced(interval));
}
//# sourceMappingURL=tick.mjs.map