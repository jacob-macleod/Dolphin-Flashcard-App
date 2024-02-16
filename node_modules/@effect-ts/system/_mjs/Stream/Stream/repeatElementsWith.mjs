import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as BP from "../BufferedPull/index.mjs";
import { Stream } from "./definitions.mjs";
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

export function repeatElementsWith(schedule) {
  return (f, g) => self => new Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, _ => BP.make(_))), "driver", () => T.toManaged(SC.driver(schedule))), "state", () => T.toManaged(Ref.makeRef(O.none))), "pull", ({
    as,
    driver,
    state
  }) => {
    const go = T.chain_(state.get, O.fold(() => T.chain_(BP.pullElement(as), o => T.as_(state.set(O.some(o)), A.single(f(o)))), o => {
      const advance = T.as_(driver.next(o), A.single(f(o)));
      const reset = T.zipLeft_(T.zipLeft_(T.map_(T.orDie(driver.last), b => A.single(g(b))), driver.reset), state.set(O.none));
      return T.orElse_(advance, () => reset);
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=repeatElementsWith.mjs.map