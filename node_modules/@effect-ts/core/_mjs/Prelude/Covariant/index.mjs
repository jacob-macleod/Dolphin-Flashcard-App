// ets_tracing: off
import * as HKT from "../HKT/index.mjs";
export function getCovariantComposition(F, G) {
  return {
    map: f => F.map(G.map(f))
  };
}
//# sourceMappingURL=index.mjs.map