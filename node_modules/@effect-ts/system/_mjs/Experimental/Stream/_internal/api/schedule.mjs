import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Collect from "./collect.mjs";
import * as ScheduleEither from "./scheduleEither.mjs";
/**
 * Schedules the output of the stream using the provided `schedule`.
 */

export function schedule_(self, schedule) {
  return Collect.collect_(ScheduleEither.scheduleEither_(self, schedule), E.fold(_ => O.none, r => O.some(r)));
}
/**
 * Schedules the output of the stream using the provided `schedule`.
 *
 * @ets_data_first schedule_
 */

export function schedule(schedule) {
  return self => schedule_(self, schedule);
}
//# sourceMappingURL=schedule.mjs.map