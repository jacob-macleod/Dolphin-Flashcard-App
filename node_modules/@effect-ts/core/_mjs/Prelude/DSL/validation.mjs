// ets_tracing: off
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import * as E from "@effect-ts/system/Either";
import { pipe } from "@effect-ts/system/Function";
import * as HKT from "../HKT/index.mjs";
import { succeedF } from "./succeed.mjs";
export function getValidationF(F) {
  return A => ({
    any: F.any,
    map: F.map,
    both: fb => fa => F.flatten(F.map(({
      tuple: [maybeA, maybeB]
    }) => E.fold_(maybeA, ea => E.fold_(maybeB, eb => F.fail(A.combine(ea, eb)), () => F.fail(ea)), a => E.fold_(maybeB, e => F.fail(e), b => succeedF(F)(Tp.tuple(a, b)))))(F.both(F.either(fb))(F.either(fa))))
  });
}
//# sourceMappingURL=validation.mjs.map