// ets_tracing: off
import * as P from "../../../Prelude/index.mjs";
import { Applicative, ApplyZip, Covariant, ForEach, Monad } from "./instances.mjs";
/**
 * `ForEach`'s `sequenceF` derivation
 */

export const sequenceF = /*#__PURE__*/P.sequenceF(ForEach);
/**
 * Generator
 */

export const gen = /*#__PURE__*/P.genWithHistoryF(Monad);
/**
 * Struct derivation
 */

export const struct = /*#__PURE__*/P.structF(Applicative);
/**
 * Tuple derivation
 */

export const tuple = /*#__PURE__*/P.tupleF(Applicative);
/**
 * Struct derivation
 */

export const structZip = /*#__PURE__*/P.structF(ApplyZip);
/**
 * Tuple derivation
 */

export const tupleZip = /*#__PURE__*/P.tupleF(ApplyZip);
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
//# sourceMappingURL=dsl.mjs.map