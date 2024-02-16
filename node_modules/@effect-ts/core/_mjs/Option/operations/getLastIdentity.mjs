// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { fromAssociative } from "../../Identity/index.mjs";
import { getLastAssociative } from "./getLastAssociative.mjs";
/**
 * `Identity` returning the left-most non-`None` value
 *
 * | x       | y       | combine(y)(x) |
 * | ------- | ------- | ------------- |
 * | none    | none    | none          |
 * | some(a) | none    | some(a)       |
 * | none    | some(a) | some(a)       |
 * | some(a) | some(b) | some(a)       |
 */

export function getLastIdentity() {
  return fromAssociative(getLastAssociative())(O.none);
}
//# sourceMappingURL=getLastIdentity.mjs.map