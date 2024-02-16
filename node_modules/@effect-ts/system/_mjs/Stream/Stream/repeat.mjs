import * as O from "../../Option/index.mjs";
import { collect_ } from "./collect.mjs";
import { repeatEither_ } from "./repeatEither.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */

export function repeat_(self, schedule) {
  return collect_(repeatEither_(self, schedule), O.fromEither);
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule.
 */

export function repeat(schedule) {
  return self => repeat_(self, schedule);
}
//# sourceMappingURL=repeat.mjs.map