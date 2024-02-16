// ets_tracing: off
import { constant } from "../../Function/index.mjs";
export function succeedF(F) {
  return a => F.map(constant(a))(F.any());
}
//# sourceMappingURL=succeed.mjs.map