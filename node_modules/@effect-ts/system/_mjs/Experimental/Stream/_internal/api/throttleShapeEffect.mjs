// ets_tracing: off
import * as CL from "../../../../Clock/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 */

export function throttleShapeEffect_(self, units, duration, costFn, burst = 0) {
  const loop = (tokens, timestamp) => CH.readWith(in_ => CH.unwrap(T.map_(T.bind_(T.bind_(T.do, "weight", () => costFn(in_)), "current", () => CL.currentTime), ({
    current,
    weight
  }) => {
    const elapsed = current - timestamp;
    const cycles = elapsed - duration;

    const available = (() => {
      const sum = Math.floor(tokens + cycles * units);
      const max = units + burst < 0 ? Number.MAX_SAFE_INTEGER : units + burst;
      return sum < 0 ? max : Math.min(sum, max);
    })();

    const remaining = available - weight;
    const waitCycles = remaining >= 0 ? 0 : -remaining / units;
    const delay = Math.floor(waitCycles * duration);

    if (delay > 0) {
      return CH.zipRight_(CH.zipRight_(CH.fromEffect(CL.sleep(delay)), CH.write(in_)), loop(remaining, current));
    } else {
      return CH.zipRight_(CH.write(in_), loop(remaining, current));
    }
  })), e => CH.fail(e), _ => CH.unit);

  return new C.Stream(CH.chain_(CH.fromEffect(CL.currentTime), _ => self.channel[">>>"](loop(units, _))));
}
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 *
 * @ets_data_first throttleShapeEffect_
 */

export function throttleShapeEffect(units, duration, costFn, burst = 0) {
  return self => throttleShapeEffect_(self, units, duration, costFn, burst);
}
//# sourceMappingURL=throttleShapeEffect.mjs.map