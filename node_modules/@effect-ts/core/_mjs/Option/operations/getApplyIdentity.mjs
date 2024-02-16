// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { fromAssociative } from "../../Identity/index.mjs";
import { getApplyAssociative } from "./getApplyAssociative.mjs";
/**
 * `Apply` Identity
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 */

export function getApplyIdentity(M) {
  return fromAssociative(getApplyAssociative(M))(O.some(M.identity));
}
//# sourceMappingURL=getApplyIdentity.mjs.map