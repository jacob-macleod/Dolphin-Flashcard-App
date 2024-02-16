// ets_tracing: off
import { pipe, tuple } from "../../Function/index.mjs";
import { chainF } from "../../Prelude/DSL/index.mjs";
import * as HKT from "../../Prelude/HKT/index.mjs";
export function monad(M) {
  return {
    any: () => s => M.map(m => tuple(m, s))(M.any()),
    flatten: ffa => x => chainF(M)(([f, us]) => f(us))(ffa(x)),
    map: f => fa => x => M.map(([a, s]) => tuple(f(a), s))(fa(x))
  };
}
//# sourceMappingURL=index.mjs.map