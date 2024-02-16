// ets_tracing: off
import * as O from "@effect-ts/system/Option";
export function getEqual(E) {
  return {
    equals: (x, y) => x === y || (O.isNone(x) ? O.isNone(y) : O.isNone(y) ? false : E.equals(x.value, y.value))
  };
}
//# sourceMappingURL=getEqual.mjs.map