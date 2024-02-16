// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Q from "../../Queue/core.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as TK from "../Take/index.mjs";
/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function intoManaged_(stream, queue) {
  return M.chain_(stream.proc, as => {
    const go = T.foldCauseM_(as, o => O.fold_(C.sequenceCauseOption(o), () => T.asUnit(Q.offer_(queue, TK.end)), c => T.zipRight_(Q.offer_(queue, TK.halt(c)), go)), a => T.zipRight_(Q.offer_(queue, TK.chunk(a)), go));
    return M.asUnit(T.toManaged(go));
  });
}
/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function intoManaged(queue) {
  return self => intoManaged_(self, queue);
}
//# sourceMappingURL=intoManaged.mjs.map