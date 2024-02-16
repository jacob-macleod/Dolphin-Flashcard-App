// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { Applicative, Covariant, Fail, Monad, Run } from "./instances.mjs";
export const tuple = /*#__PURE__*/P.tupleF(Applicative);
export const struct = /*#__PURE__*/P.structF(Applicative);
export const getValidationApplicative = /*#__PURE__*/P.getValidationF({ ...Applicative,
  ...Fail,
  ...Run,
  ...Monad
});
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