// ets_tracing: off
import { effectMaybeAsyncInterruptBlockingOn } from "../Effect/effectMaybeAsyncInterrupt.mjs";
import * as E from "../Either/index.mjs";
import { interruptJoiner } from "./interruptJoiner.mjs";
import { Pending } from "./state.mjs";
/**
 * Retrieves the value of the promise, suspending the fiber running the action
 * until the result is available.
 */

function wait(promise) {
  return effectMaybeAsyncInterruptBlockingOn(k => {
    const state = promise.state.get;

    switch (state._tag) {
      case "Done":
        {
          return E.right(state.value);
        }

      case "Pending":
        {
          promise.state.set(new Pending([k, ...state.joiners]));
          return E.left(interruptJoiner(k)(promise));
        }
    }
  }, promise.blockingOn);
}

export { wait as await };
//# sourceMappingURL=await.mjs.map