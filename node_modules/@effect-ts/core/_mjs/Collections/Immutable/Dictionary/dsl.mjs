// ets_tracing: off
import * as P from "../../../Prelude/index.mjs";
import { ForEach } from "./instances.mjs";
/**
 * Like traverse(identity)
 */

export const sequence = /*#__PURE__*/P.sequenceF(ForEach);
/**
 * Matchers
 */

export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(ForEach);
/**
 * Conditionals
 */

const branch = /*#__PURE__*/P.conditionalF(ForEach);
const branch_ = /*#__PURE__*/P.conditionalF_(ForEach);
export { branch as if, branch_ as if_ };
//# sourceMappingURL=dsl.mjs.map