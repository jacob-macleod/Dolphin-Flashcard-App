import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Map from "./map.mjs";
import * as Unwrap from "./unwrap.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */

export function repeatWith_(self, schedule, f, g) {
  return Unwrap.unwrap(T.map_(T.bind_(T.do, "driver", () => SC.driver(schedule)), ({
    driver
  }) => {
    const scheduleOutput = T.map_(T.orDie(driver.last), g);
    const process = Map.map_(self, f).channel;
    const loop = CH.unwrap(T.fold_(driver.next(undefined), _ => CH.unit, _ => CH.zipRight_(CH.zipRight_(process, CH.unwrap(T.map_(scheduleOutput, o => CH.write(CK.single(o))))), loop)));
    return new C.Stream(CH.zipRight_(process, loop));
  }));
}
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 *
 * @ets_data_first repeatWith_
 */

export function repeatWith(schedule, f, g) {
  return self => repeatWith_(self, schedule, f, g);
}
//# sourceMappingURL=repeatWith.mjs.map