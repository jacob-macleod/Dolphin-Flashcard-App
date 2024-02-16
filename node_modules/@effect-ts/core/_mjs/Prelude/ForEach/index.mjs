// ets_tracing: off
import { identity, pipe } from "../../Function/index.mjs";
import { getCovariantComposition } from "../Covariant/index.mjs";
import * as HKT from "../HKT/index.mjs";
export function implementForEachF() {
  return i => i();
}
export function getForEachComposition(F, G) {
  return { ...getCovariantComposition(F, G),
    forEachF: H => f => F.forEachF(H)(G.forEachF(H)(f))
  };
}
export function sequenceF(T) {
  return App => {
    const traverse = T.forEachF(App);
    return traverse(identity);
  };
}
//# sourceMappingURL=index.mjs.map