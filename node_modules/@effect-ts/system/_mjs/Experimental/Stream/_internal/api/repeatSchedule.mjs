import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Collect from "./collect.mjs";
import * as RepeatEither from "./repeatEither.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */

export function repeatSchedule_(self, schedule) {
  return Collect.collect_(RepeatEither.repeatEither_(self, schedule), E.fold(_ => O.none, a => O.some(a)));
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 *
 * @ets_data_first repeat_
 */

export function repeatSchedule(schedule) {
  return self => repeatSchedule_(self, schedule);
}
//# sourceMappingURL=repeatSchedule.mjs.map