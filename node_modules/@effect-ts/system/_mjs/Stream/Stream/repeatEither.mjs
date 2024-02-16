import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { repeatWith } from "./repeatWith.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */

export function repeatEither_(self, schedule) {
  return repeatWith(schedule)(E.right, E.left)(self);
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition.
 */

export function repeatEither(schedule) {
  return self => repeatEither_(self, schedule);
}
//# sourceMappingURL=repeatEither.mjs.map