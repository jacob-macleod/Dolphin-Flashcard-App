// ets_tracing: off
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as DSL from "../Prelude/DSL/index.mjs";
import { Applicative, Covariant, Monad } from "./instances.mjs";
/**
 * Struct based applicative for IO[+_]
 */

export const struct = /*#__PURE__*/DSL.structF(Applicative);
/**
 * Tuple based applicative for IO[+_]
 */

export const tuple = /*#__PURE__*/DSL.tupleF(Applicative);
/**
 * Initialize Do
 */

export const do_ = /*#__PURE__*/DSL.doF(Monad);
/**
 * Bind variable in scope
 */

export const bind = /*#__PURE__*/DSL.bindF(Monad);
/**
 * Bind variable in scope
 */

const let_ = /*#__PURE__*/DSL.letF(Monad);
export { let_ as let, do_ as do };
/**
 * Matchers
 */

export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/DSL.matchers(Covariant);
/**
 * Conditionals
 */

const branch = /*#__PURE__*/DSL.conditionalF(Covariant);
const branch_ = /*#__PURE__*/DSL.conditionalF_(Covariant);
export { branch as if, branch_ as if_ };
/**
 * Foreach
 */

export const forEachArray = /*#__PURE__*/A.forEachF(Applicative);
export const forEachWithIndexArray = /*#__PURE__*/A.forEachWithIndexF(Applicative);
//# sourceMappingURL=dsls.mjs.map