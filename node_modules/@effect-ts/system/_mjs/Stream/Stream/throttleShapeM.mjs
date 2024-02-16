// ets_tracing: off
import * as CL from "../../Clock/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 */

export function throttleShapeM_(self, costFn, units, duration, burst = 0) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "currentTime", () => T.toManaged(CL.currentTime)), "bucket", ({
    currentTime
  }) => T.toManaged(Ref.makeRef(Tp.tuple(units, currentTime)))), "pull", ({
    bucket,
    chunks
  }) => T.map_(T.tap_(T.bind_(T.bind_(T.bind_(T.bind_(T.do, "chunk", () => chunks), "weight", ({
    chunk
  }) => T.mapError_(costFn(chunk), O.some)), "current", () => CL.currentTime), "delay", ({
    current,
    weight
  }) => Ref.modify_(bucket, ({
    tuple: [tokens, timestamp]
  }) => {
    const elapsed = current - timestamp;
    const cycles = elapsed / duration;

    const available = (() => {
      const sum = tokens + cycles * units;
      const max = units + burst < 0 ? Number.MAX_VALUE : units + burst;
      return sum < 0 ? max : Math.min(sum, max);
    })();

    const remaining = available - weight;
    const waitCycles = remaining >= 0 ? 0 : -remaining / units;
    const delay = waitCycles * duration;
    return Tp.tuple(delay, Tp.tuple(remaining, current));
  })), ({
    delay
  }) => T.when_(CL.sleep(delay), () => delay > 0)), ({
    chunk
  }) => chunk)), ({
    pull
  }) => pull));
}
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 *
 * @ets_data_first throttleShapeM_
 */

export function throttleShapeM(costFn, units, duration, burst = 0) {
  return self => throttleShapeM_(self, costFn, units, duration, burst);
}
//# sourceMappingURL=throttleShapeM.mjs.map