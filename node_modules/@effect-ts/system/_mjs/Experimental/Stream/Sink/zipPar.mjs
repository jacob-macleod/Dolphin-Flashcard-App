// ets_tracing: off
import * as A from "../../../Collections/Immutable/Array/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as ZipWithPar from "./zipWithPar.mjs";
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */

export function zipPar_(...[s1, s2, ...sinks]) {
  const init = ZipWithPar.zipWithPar_(s1, s2, Tp.tuple); // @ts-expect-error

  return A.reduce_(sinks, init, (acc, v) => // @ts-expect-error
  ZipWithPar.zipWithPar_(acc, v, (a, b) => Tp.append_(a, b)));
}
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 *
 * @ets_data_first zipPar_
 */

export function zipPar(...[s1, ...sinks]) {
  return self => zipPar_(self, s1, ...sinks);
}
//# sourceMappingURL=zipPar.mjs.map