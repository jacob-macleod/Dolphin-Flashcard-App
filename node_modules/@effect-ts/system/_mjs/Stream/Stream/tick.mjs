import * as SC from "../../Schedule/index.mjs";
import { repeatValueWith } from "./repeatValueWith.mjs";
/**
 * A stream that emits Unit values spaced by the specified duration.
 */

export function tick(interval) {
  return repeatValueWith(() => undefined, SC.spaced(interval));
}
//# sourceMappingURL=tick.mjs.map