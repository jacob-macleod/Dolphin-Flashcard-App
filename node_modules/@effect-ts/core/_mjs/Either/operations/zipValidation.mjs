// ets_tracing: off
import * as E from "@effect-ts/system/Either";
import { tuple } from "../../Function/index.mjs";
/**
 * Zip combining errors in case of multiple failures
 */

export function zipValidation(A) {
  return fb => E.fold(ea => E.fold_(fb, eb => E.left(A.combine(ea, eb)), () => E.left(ea)), a => E.fold_(fb, E.left, b => E.right(tuple(a, b))));
}
//# sourceMappingURL=zipValidation.mjs.map