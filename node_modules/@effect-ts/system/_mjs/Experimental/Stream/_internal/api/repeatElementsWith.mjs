import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * This function accepts two conversion functions, which allow the output of this stream and the
 * output of the provided schedule to be unified into a single type. For example, `Either` or
 * similar data type.
 */

export function repeatElementsWith_(self, schedule, f, g) {
  return new C.Stream(self.channel[">>>"](CH.unwrap(T.map_(T.bind_(T.do, "driver", () => SC.driver(schedule)), ({
    driver
  }) => {
    const feed = in_ => O.fold_(CK.head(in_), () => loop(), a => CH.zipRight_(CH.write(CK.single(f(a))), step(CK.drop_(in_, 1), a)));

    const step = (in_, a) => {
      const advance = T.as_(driver.next(a), CH.zipRight_(CH.write(CK.single(f(a))), step(in_, a)));
      const reset = T.map_(T.tap_(T.bind_(T.do, "b", () => T.orDie(driver.last)), () => driver.reset), ({
        b
      }) => CH.zipRight_(CH.write(CK.single(g(b))), feed(in_)));
      return CH.unwrap(T.orElse_(advance, () => reset));
    };

    const loop = () => CH.readWith(feed, _ => CH.fail(_), _ => CH.unit);

    return loop();
  }))));
}
/**
 * Repeats each element of the stream using the provided schedule. When the schedule is finished,
 * then the output of the schedule will be emitted into the stream. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * This function accepts two conversion functions, which allow the output of this stream and the
 * output of the provided schedule to be unified into a single type. For example, `Either` or
 * similar data type.
 *
 * @ets_data_first repeatElementsWith_
 */

export function repeatElementsWith(schedule, f, g) {
  return self => repeatElementsWith_(self, schedule, f, g);
}
//# sourceMappingURL=repeatElementsWith.mjs.map