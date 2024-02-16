// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { Applicative, Covariant, Monad } from "./instances.mjs";
/**
 * Struct based applicative for Reader[-_, +_]
 */

export const struct = /*#__PURE__*/P.structF(Applicative);
/**
 * Struct based applicative for Reader[-_, +_]
 */

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
/**
 * Conditionals
 */

const branch = /*#__PURE__*/P.conditionalF(Covariant);
const branch_ = /*#__PURE__*/P.conditionalF_(Covariant);
export { branch as if, branch_ as if_ };
/**
 * Do
 */

export const bind = /*#__PURE__*/P.bindF(Monad);
const let_ = /*#__PURE__*/P.letF(Monad);
const do_ = /*#__PURE__*/P.doF(Monad);
export { do_ as do, let_ as let };
/**
 * Generator
 */

export const gen = /*#__PURE__*/P.genF(Monad);
//# sourceMappingURL=dsls.mjs.map