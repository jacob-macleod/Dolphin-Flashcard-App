import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { repeatElementsWith } from "./repeatElementsWith.mjs";
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */

export function repeatElementsEither_(self, schedule) {
  return repeatElementsWith(schedule)(E.right, E.left)(self);
}
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */

export function repeatElementsEither(schedule) {
  return self => repeatElementsEither_(self, schedule);
}
//# sourceMappingURL=repeatElementsEither.mjs.map