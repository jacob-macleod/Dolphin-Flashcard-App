import * as T from "../../../../Effect/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as RepeatEffectOption from "./repeatEffectOption.mjs";
import * as Unwrap from "./unwrap.mjs";
/**
 * Creates a stream from a `Schedule` that does not require any further
 * input. The stream will emit an element for each value output from the
 * schedule, continuing for as long as the schedule continues.
 */

export function fromSchedule(schedule) {
  return Unwrap.unwrap(T.map_(SC.driver(schedule), driver => RepeatEffectOption.repeatEffectOption(driver.next(undefined))));
}
//# sourceMappingURL=fromSchedule.mjs.map