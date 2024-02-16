import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as CatchAll from "./catchAll.mjs";
import * as Tap from "./tap.mjs";
import * as Unwrap from "./unwrap.mjs";
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 */

export function retry_(self, schedule) {
  return Unwrap.unwrap(T.map_(T.bind_(T.do, "driver", () => SC.driver(schedule)), ({
    driver
  }) => {
    const loop = CatchAll.catchAll_(self, e => Unwrap.unwrap(T.foldM_(driver.next(e), _ => T.fail(e), _ => T.succeed(Tap.tap_(loop, _ => driver.reset)))));
    return loop;
  }));
}
/**
 * When the stream fails, retry it according to the given schedule
 *
 * This retries the entire stream, so will re-execute all of the stream's acquire operations.
 *
 * The schedule is reset as soon as the first element passes through the stream again.
 *
 * @ets_data_first retry_
 */

export function retry(schedule) {
  return self => retry_(self, schedule);
}
//# sourceMappingURL=retry.mjs.map