import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
import { repeatElementsEither_ } from "./repeatElementsEither.mjs";
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */

export function repeatElements_(self, schedule) {
  return collect_(repeatElementsEither_(self, schedule), O.fromEither);
}
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */

export function repeatElements(schedule) {
  return self => repeatElements_(self, schedule);
}
//# sourceMappingURL=repeatElements.mjs.map