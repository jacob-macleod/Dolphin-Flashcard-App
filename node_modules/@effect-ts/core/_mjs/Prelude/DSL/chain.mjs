// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
export function chainF(F) {
  return f => x => F.flatten(F.map(f)(x));
}
//# sourceMappingURL=chain.mjs.map