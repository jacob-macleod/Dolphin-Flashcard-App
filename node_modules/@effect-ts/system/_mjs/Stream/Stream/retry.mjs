import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */

export function retry_(self, schedule) {
  return new Stream(M.map_(M.let_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "driver", () => T.toManaged(SC.driver(schedule))), "currStream", () => T.toManaged(Ref.makeRef(Pull.end))), "switchStream", () => M.switchable()), ({
    currStream,
    switchStream
  }) => T.toManaged(T.chain_(switchStream(self.proc), currStream.set))), "pull", ({
    currStream,
    driver,
    switchStream
  }) => {
    const loop = T.catchSome_(T.flatten(currStream.get), O.fold(() => O.none, e => O.some(T.foldM_(driver.next(e), _ => Pull.fail(e), _ => T.zipRight_(T.chain_(switchStream(self.proc), currStream.set), T.tap_(loop, _ => driver.reset))))));
    return loop;
  }), ({
    pull
  }) => pull));
}
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @param schedule Schedule receiving as input the errors of the stream
 * @return Stream outputting elements of all attempts of the stream
 */

export function retry(schedule) {
  return self => retry_(self, schedule);
}
//# sourceMappingURL=retry.mjs.map