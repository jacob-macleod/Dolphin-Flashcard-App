import * as P from "../../../Prelude/index.mjs";
import { isOption } from "../../../Utils/index.mjs";
import { Applicative, Covariant, ForEach, Monad } from "./instances.mjs";
export const sequence = /*#__PURE__*/P.sequenceF(ForEach);

const adapter = _ => new P.GenLazyHKT(() => {
  const x = _();

  if (isOption(x)) {
    return x._tag === "None" ? [] : [x.value];
  }

  return x;
});

export const gen = /*#__PURE__*/P.genWithHistoryF(Monad, {
  adapter
});
export const tuple = /*#__PURE__*/P.tupleF(Applicative);
export const struct = /*#__PURE__*/P.structF(Applicative);
const do_ = /*#__PURE__*/P.doF(Monad);
export const bind = /*#__PURE__*/P.bindF(Monad);
const let_ = /*#__PURE__*/P.letF(Monad);
export { do_ as do, let_ as let };
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
/**
 * Conditionals
 */

const branch = /*#__PURE__*/P.conditionalF(Covariant);
const branch_ = /*#__PURE__*/P.conditionalF_(Covariant);
export { branch as if, branch_ as if_ };
//# sourceMappingURL=dsl.mjs.map