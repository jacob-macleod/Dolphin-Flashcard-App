// ets_tracing: off
import * as O from "../Option/core.mjs";
import { map_ } from "./map.mjs";
/**
 * Maps the success value of this effect to an optional value.
 */

export function asSome(fa, __trace) {
  return map_(fa, O.some, __trace);
}
//# sourceMappingURL=asSome.mjs.map