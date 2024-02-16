import { pipe } from "../Function/index.mjs";
import * as catchAllCause from "./catchAllCause.mjs";
import { fork } from "./core.mjs";
import * as Do from "./do.mjs";
import * as P from "./excl-forEach-promise.mjs";
import { uninterruptibleMask } from "./interruption.mjs";
import * as map from "./map.mjs";
import { runtime } from "./runtime.mjs";
import * as to from "./to.mjs";
import * as zips from "./zips.mjs";
/**
 * Imports an asynchronous effect into a pure `Effect` value. This formulation is
 * necessary when the effect is itself expressed in terms of `Effect`.
 */

export function effectAsyncM(register, __trace) {
  return map.map_(Do.bind_(Do.bind_(Do.bind_(Do.do, "p", () => P.make()), "r", () => runtime()), "a", ({
    p,
    r
  }) => uninterruptibleMask(({
    restore
  }) => zips.zipRight_(fork(restore(catchAllCause.catchAllCause_(register(k => {
    r.run(to.to_(k, p));
  }), c => P.halt(c)(p))), __trace), restore(P.await(p))))), ({
    a
  }) => a);
}
//# sourceMappingURL=effectAsyncM.mjs.map