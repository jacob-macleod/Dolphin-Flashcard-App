import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Schedules the output of the stream using the provided `schedule` and emits its output at
 * the end (if `schedule` is finite).
 * Uses the provided function to align the stream and schedule outputs on the same type.
 */

export function scheduleWith(schedule) {
  return (f, g) => self => {
    return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, BP.make)), "driver", () => T.toManaged(SC.driver(schedule))), "pull", ({
      as,
      driver
    }) => T.chain_(BP.pullElement(as), o => T.orElse_(T.as_(driver.next(o), A.single(f(o))), () => T.zipLeft_(T.map_(T.orDie(driver.last), b => A.append_(A.single(f(o)), g(b))), driver.reset)))), ({
      pull
    }) => pull));
  };
}
//# sourceMappingURL=scheduleWith.mjs.map