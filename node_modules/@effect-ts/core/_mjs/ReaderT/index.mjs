// ets_tracing: off
import "../Operator/index.mjs";
import { pipe } from "../Function/index.mjs";
import { succeedF } from "../Prelude/DSL/index.mjs";
import * as HKT from "../Prelude/HKT/index.mjs";
import * as R from "../Reader/index.mjs";
export function monad(M) {
  return {
    any: () => M.any,
    flatten: ffa => r => M.flatten(M.map(f => f(r))(ffa(r))),
    map: f => fa => r => M.map(f)(fa(r))
  };
}
export function access(M) {
  return {
    access: f => R.map(succeedF(M))(R.access(f))
  };
}
export function associativeEither(M) {
  return {
    orElseEither: fb => fa => r => M.orElseEither(() => fb()(r))(fa(r))
  };
}
export function provide(M) {
  return {
    provide: r => R.provideSome(() => r)
  };
}
export function applicative(M) {
  return {
    any: () => R.succeed(M.any()),
    map: f => R.map(M.map(f)),
    both: fb => fa => R.map(({
      tuple: [_a, _b]
    }) => M.both(_b)(_a))(R.zip(fb)(fa))
  };
}
export function run(M) {
  return {
    either: fa => R.map(M.either)(fa)
  };
}
export function fail(M) {
  return {
    fail: e => R.succeed(M.fail(e))
  };
}
//# sourceMappingURL=index.mjs.map