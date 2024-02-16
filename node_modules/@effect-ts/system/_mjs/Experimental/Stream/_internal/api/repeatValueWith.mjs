import * as T from "../../../../Effect/index.mjs";
import * as RepeatEffectWith from "./repeatEffectWith.mjs";
/**
 * Repeats the value using the provided schedule.
 */

export function repeatValueWith(a, schedule) {
  return RepeatEffectWith.repeatEffectWith(T.succeed(a), schedule);
}
//# sourceMappingURL=repeatValueWith.mjs.map