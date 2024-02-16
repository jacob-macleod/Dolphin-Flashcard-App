// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { makeAssociative } from "../../Associative/index.mjs";
/**
 * `Apply` Associative
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 */

export function getApplyAssociative(S) {
  return makeAssociative((x, y) => O.isSome(x) && O.isSome(y) ? O.some(S.combine(x.value, y.value)) : O.none);
}
//# sourceMappingURL=getApplyAssociative.mjs.map