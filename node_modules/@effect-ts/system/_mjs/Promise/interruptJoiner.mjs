import { succeedWith } from "../Effect/core.mjs";
import { Pending } from "./state.mjs";
export function interruptJoiner(joiner) {
  return promise => succeedWith(() => {
    const state = promise.state.get;

    if (state._tag === "Pending") {
      promise.state.set(new Pending(state.joiners.filter(j => j !== joiner)));
    }
  });
}
//# sourceMappingURL=interruptJoiner.mjs.map