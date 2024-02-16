// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { zipWithPar_ } from "./zipWithPar.mjs";
/**
 * Parallely zips this effects
 */

export function zipPar_(a, b, __trace) {
  return zipWithPar_(a, b, Tp.tuple, __trace);
}
/**
 * Parallely zips this effects
 */

export function zipPar(b, __trace) {
  return a => zipPar_(a, b, __trace);
}
//# sourceMappingURL=zipPar.mjs.map