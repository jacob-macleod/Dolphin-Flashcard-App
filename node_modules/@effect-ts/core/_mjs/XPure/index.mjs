// ets_tracing: off
import "../Operator/index.mjs";
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import { constant, identity } from "@effect-ts/system/Function";
import * as X from "@effect-ts/system/XPure";
import * as P from "../Prelude/index.mjs";
export const Any = {
  any: () => X.succeed(constant({}))
};
export const Covariant = {
  map: X.map
};
export const AssociativeBoth = {
  both: X.zip
};
export const AssociativeEither = {
  orElseEither: X.orElseEither
};
export const AssociativeFlatten = {
  flatten: ffa => X.chain_(ffa, identity)
};
export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
export const Access = {
  access: X.access
};
export const Fail = {
  fail: X.fail
};
export const Provide = {
  provide: X.provideAll
};
export const Monad = { ...Any,
  ...AssociativeFlatten,
  ...Covariant
};
export const StateCategory = {
  id: () => X.modify(a => Tp.tuple(a, a)),
  compose: bc => X.chain(_ => bc)
};
export const Category = {
  id: () => X.access(identity),
  compose: bc => ab => X.chain_(ab, b => X.provideAll_(bc, b))
};
export const struct = /*#__PURE__*/P.structF(Applicative);
export const tuple = /*#__PURE__*/P.tupleF(Applicative);
/**
 * Matchers
 */

export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(Covariant);
export * from "@effect-ts/system/XPure";
//# sourceMappingURL=index.mjs.map