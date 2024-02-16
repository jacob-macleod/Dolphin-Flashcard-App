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
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 *
 * @ets_data_first throttleEnforceM_
 */

export function throttleEnforceM(costFn, units, duration, burst = 0) {
  return self => throttleEnforceM_(self, costFn, units, duration, burst);
}
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 */

export function throttleEnforceM_(self, costFn, units, duration, burst = 0) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "currentTime", () => T.toManaged(CL.currentTime)), "bucket", ({
    currentTime
  }) => T.toManaged(Ref.makeRef(Tp.tuple(units, currentTime)))), "pull", ({
    bucket,
    chunks
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(T.zip_(T.mapError_(costFn(chunk), O.some), CL.currentTime), ({
      tuple: [weight, current]
    }) => T.chain_(Ref.modify_(bucket, ({
      tuple: [tokens, timestamp]
    }) => {
      const elapsed = current - timestamp;
      const cycles = elapsed / duration;

      const available = (() => {
        const sum = tokens + cycles * units;
        const max = units + burst < 0 ? Number.MAX_VALUE : units + burst;
        return sum < 0 ? max : Math.min(sum, max);
      })();

      if (weight <= available) {
        return Tp.tuple(O.some(chunk), Tp.tuple(available - weight, current));
      } else {
        return Tp.tuple(O.none, Tp.tuple(available, current));
      }
    }), O.fold(() => go, os => T.succeed(os))))); //

    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=throttleEnforceM.mjs.map