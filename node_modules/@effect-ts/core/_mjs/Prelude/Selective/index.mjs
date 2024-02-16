// ets_tracing: off
import * as E from "@effect-ts/system/Either";
import { constant, identity, pipe } from "../../Function/index.mjs";
import * as HKT from "../../Prelude/HKT/index.mjs";
import { chainF, succeedF } from "../DSL/index.mjs";
export function monad(F) {
  return { ...F,
    select: fab => fa => chainF(F)(E.fold(a => F.map(g => g(a))(fab), b => succeedF(F)(b)))(fa)
  };
}
export function applicative(F) {
  return { ...F,
    select: fab => fa => F.map(({
      tuple: [ea, f]
    }) => E.fold_(ea, f, identity))(F.both(fab)(fa))
  };
}
export function branchF(F) {
  return (lhs, rhs) => x => F.select(rhs)(F.select(F.map(fac => x => E.widenE()(E.right(fac(x))))(lhs))(F.map(E.map(E.left))(x)));
}
export function ifF(F) {
  return (then_, else_) => x => branchF(F)(F.map(constant)(then_), F.map(constant)(else_))(F.map(x => x ? E.left(undefined) : E.right(undefined))(x));
}
export function whenF(F) {
  return act => ifF(F)(act, succeedF(F)(undefined));
}
//# sourceMappingURL=index.mjs.map