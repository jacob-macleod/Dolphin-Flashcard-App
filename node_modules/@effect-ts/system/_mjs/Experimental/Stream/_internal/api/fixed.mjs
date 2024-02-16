import * as SC from "../../../../Schedule/index.mjs";
import * as Schedule from "./schedule.mjs";
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 */

export function fixed_(self, duration) {
  return Schedule.schedule_(self, SC.fixed(duration));
}
/**
 * Emits elements of this stream with a fixed delay in between, regardless of how long it
 * takes to produce a value.
 *
 * @ets_data_first fixed_
 */

export function fixed(duration) {
  return self => fixed_(self, duration);
}
//# sourceMappingURL=fixed.mjs.map