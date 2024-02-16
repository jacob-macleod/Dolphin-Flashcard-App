import * as T from "../_internal/effect.mjs";
import { repeatEffectWith } from "./repeatEffectWith.mjs";
/**
 * Repeats the value using the provided schedule.
 */

export function repeatValueWith(a, schedule) {
  return repeatEffectWith(T.succeedWith(a), schedule);
}
//# sourceMappingURL=repeatValueWith.mjs.map