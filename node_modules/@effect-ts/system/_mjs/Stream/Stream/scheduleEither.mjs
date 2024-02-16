import * as E from "../../Either/index.mjs";
import { scheduleWith } from "./scheduleWith.mjs";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */

export function scheduleEither_(self, schedule) {
  return scheduleWith(schedule)(E.right, E.left)(self);
}
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */

export function scheduleEither(schedule) {
  return self => scheduleEither_(self, schedule);
}
//# sourceMappingURL=scheduleEither.mjs.map