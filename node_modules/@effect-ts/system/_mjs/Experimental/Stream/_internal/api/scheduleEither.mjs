import * as E from "../../../../Either/index.mjs";
import * as ScheduleWith from "./scheduleWith.mjs";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 */

export function scheduleEither_(self, schedule) {
  return ScheduleWith.scheduleWith_(self, schedule, r => E.right(r), l => E.left(l));
}
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 *
 * @ets_data_first scheduleEither_
 */

export function scheduleEither(schedule) {
  return self => scheduleEither_(self, schedule);
}
//# sourceMappingURL=scheduleEither.mjs.map