import { constVoid, pipe } from "../../Function/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import { repeatEffectOption } from "./repeatEffectOption.mjs";
import { unwrap } from "./unwrap.mjs";
/**
 * Creates a stream from a `Schedule` that does not require any further
 * input. The stream will emit an element for each value output from the
 * schedule, continuing for as long as the schedule continues.
 */

export const fromSchedule = x => unwrap(T.map_(SC.driver(x), driver => repeatEffectOption(driver.next(constVoid()))));
//# sourceMappingURL=fromSchedule.mjs.map