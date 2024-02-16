// ets_tracing: off
import { currentTime } from "../Clock/index.mjs";
import { summarized_ } from "./summarized.mjs";
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 */

export function timedWith_(self, msTime, __trace) {
  return summarized_(self, msTime, (start, end) => end - start, __trace);
}
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @ets_data_first timedWith_
 */

export function timedWith(msTime, __trace) {
  return self => timedWith_(self, msTime, __trace);
}
/**
 * Returns a new effect that executes this one and times the execution.
 */

export function timed(self, __trace) {
  return timedWith_(self, currentTime, __trace);
}
//# sourceMappingURL=timed.mjs.map