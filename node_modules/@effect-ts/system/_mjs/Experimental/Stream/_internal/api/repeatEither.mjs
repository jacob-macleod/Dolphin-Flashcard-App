import * as E from "../../../../Either/index.mjs";
import * as RepeatWith from "./repeatWith.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */

export function repeatEither_(self, schedule) {
  return RepeatWith.repeatWith_(self, schedule, E.right, E.left);
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 *
 * @ets_data_first repeatEither_
 */

export function repeatEither(schedule) {
  return self => repeatEither_(self, schedule);
}
//# sourceMappingURL=repeatEither.mjs.map