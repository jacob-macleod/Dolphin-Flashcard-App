// ets_tracing: off
import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import { pipe } from "@effect-ts/system/Function";
import * as HKT from "../HKT/index.mjs";
import { chainF } from "./chain.mjs";
export function getApplicativeF(F) {
  const chain = chainF(F);
  return {
    any: F.any,
    map: F.map,
    both: fb => fa => chain(a => F.map(b => Tp.tuple(b, a))(fa))(fb)
  };
}
//# sourceMappingURL=applicative.mjs.map