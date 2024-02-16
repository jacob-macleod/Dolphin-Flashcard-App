// ets_tracing: off
import { succeedWith, suspend } from "./core.mjs";
import { effectAsyncInterrupt } from "./effectAsyncInterrupt.mjs";
/**
 * Returns a effect that will never produce anything. The moral equivalent of
 * `while(true) {}`, only without the wasted CPU cycles.
 */

export const never = /*#__PURE__*/suspend(() => effectAsyncInterrupt(() => {
  const interval = setInterval(() => {//
  }, 60000);
  return succeedWith(() => {
    clearInterval(interval);
  });
}));
//# sourceMappingURL=never.mjs.map