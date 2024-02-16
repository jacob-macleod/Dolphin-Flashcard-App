// ets_tracing: off
import { instance } from "../Prelude/index.mjs";
export function makeCommutative(f) {
  return {
    combine: f,
    commute: (x, y) => f(y, x)
  };
}
//# sourceMappingURL=operations.mjs.map