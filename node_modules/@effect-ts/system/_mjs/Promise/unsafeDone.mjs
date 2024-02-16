import { Done } from "./state.mjs";
/**
 * Unsafe version of done
 */

export function unsafeDone(io) {
  return promise => {
    const state = promise.state.get;

    if (state._tag === "Pending") {
      promise.state.set(new Done(io));
      Array.from(state.joiners).reverse().forEach(f => {
        f(io);
      });
    }
  };
}
//# sourceMappingURL=unsafeDone.mjs.map