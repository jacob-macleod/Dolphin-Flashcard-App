import * as E from "../../Either/index.mjs";
import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
import { scheduleEither_ } from "./scheduleEither.mjs";
/**
 * Schedules the output of the stream using the provided `schedule`.
 */

export function schedule_(self, schedule) {
  return collect_(scheduleEither_(self, schedule), E.fold(_ => O.none, a => O.some(a)));
}
/**
 * Schedules the output of the stream using the provided `schedule`.
 */

export function schedule(schedule) {
  return self => schedule_(self, schedule);
}
//# sourceMappingURL=schedule.mjs.map