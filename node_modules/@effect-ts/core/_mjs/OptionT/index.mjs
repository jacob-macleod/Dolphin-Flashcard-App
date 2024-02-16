// ets_tracing: off
import "../Operator/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { succeedF } from "../Prelude/DSL/index.mjs";
import * as HKT from "../Prelude/HKT/index.mjs";
export function monad(M) {
  const succeed = succeedF(M);
  return {
    any: () => succeed(O.some({})),
    flatten: x => M.flatten(M.map(o => o._tag === "None" ? succeed(O.none) : o.value)(x)),
    map: f => M.map(O.map(f))
  };
}
export function applicative(M) {
  const succeed = succeedF(M);
  return {
    any: () => succeed(O.some({})),
    map: f => M.map(O.map(f)),
    both: fb => x => M.map(({
      tuple: [a, b]
    }) => O.zip_(a, b))(M.both(fb)(x))
  };
}
export function access(M) {
  return {
    access: f => M.map(O.some)(M.access(f))
  };
}
export function provide(M) {
  return {
    provide: M.provide
  };
}
//# sourceMappingURL=index.mjs.map