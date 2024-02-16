// ets_tracing: off
import "../../Operator/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { succeedF } from "../../Prelude/DSL/index.mjs";
import * as HKT from "../../Prelude/HKT/index.mjs";
import * as R from "../XReader/index.mjs";
export function monad(M) {
  return {
    any: () => R.succeed(M.any()),
    flatten: ffa => R.map(M.flatten)(R.access(e => M.map(R.runEnv(e))(R.runEnv(e)(ffa)))),
    map: f => R.map(M.map(f))
  };
}
export function access(M) {
  return {
    access: x => R.map(succeedF(M))(R.access(x))
  };
}
export function provide(_) {
  return {
    provide: r => R.provideSome(() => r)
  };
}
export function applicative(M) {
  return {
    any: () => R.succeed(M.any()),
    map: f => R.map(M.map(f)),
    both: fb => x => R.map(({
      tuple: [_a, _b]
    }) => M.both(_b)(_a))(R.zip(fb)(x))
  };
}
export function run(M) {
  return {
    either: x => R.map(M.either)(x)
  };
}
export function fail(M) {
  return {
    fail: x => R.succeed(M.fail(x))
  };
}
//# sourceMappingURL=index.mjs.map