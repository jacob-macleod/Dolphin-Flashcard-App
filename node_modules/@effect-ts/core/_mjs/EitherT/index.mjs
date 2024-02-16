// ets_tracing: off
import "../Operator/index.mjs";
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { succeedF } from "../Prelude/DSL/index.mjs";
import * as HKT from "../Prelude/HKT/index.mjs";
export function monad(M) {
  const succeed = succeedF(M);
  return {
    any: () => succeedF(M)(E.right({})),
    flatten: ffa => M.flatten(M.map(e => e._tag === "Left" ? succeed(e) : e.right)(ffa)),
    map: f => M.map(E.map(f))
  };
}
export function applicative(M) {
  return {
    any: () => succeedF(M)(E.right({})),
    map: f => M.map(E.map(f)),
    both: fb => x => M.map(({
      tuple: [ea, eb]
    }) => E.AssociativeBoth.both(eb)(ea))(M.both(fb)(x))
  };
}
export function run(M) {
  return {
    either: M.map(E.Run.either)
  };
}
export function fail(M) {
  const succeed = succeedF(M);
  return {
    fail: x => succeed(E.left(x))
  };
}
export function access(M) {
  return {
    access: f => M.map(E.right)(M.access(f))
  };
}
export function provide(M) {
  return {
    provide: M.provide
  };
}
//# sourceMappingURL=index.mjs.map