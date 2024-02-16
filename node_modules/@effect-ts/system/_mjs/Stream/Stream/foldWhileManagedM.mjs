// ets_tracing: off
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @param cont function which defines the early termination condition
 */

export function foldWhileManagedM(s) {
  return cont => f => self => M.chain_(self.proc, is => {
    const loop = s1 => {
      if (!cont(s1)) {
        return T.succeed(s1);
      } else {
        return T.foldM_(is, O.fold(() => T.succeed(s1), e => T.fail(e)), ch => T.chain_(T.reduce_(ch, s1, f), loop));
      }
    };

    return M.fromEffect(loop(s));
  });
}
//# sourceMappingURL=foldWhileManagedM.mjs.map