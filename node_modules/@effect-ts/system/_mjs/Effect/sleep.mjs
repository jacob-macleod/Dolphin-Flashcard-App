// ets_tracing: off
import { sleep as clockSleep } from "../Clock/index.mjs";
/**
 * Sleeps for `ms` milliseconds
 */

export function sleep(ms, __trace) {
  return clockSleep(ms, __trace);
}
//# sourceMappingURL=sleep.mjs.map