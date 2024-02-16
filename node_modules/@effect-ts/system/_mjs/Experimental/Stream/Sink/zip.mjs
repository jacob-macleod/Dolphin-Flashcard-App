// ets_tracing: off
import * as A from "../../../Collections/Immutable/Array/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as ZipWith from "./zipWith.mjs";
export function zip_(...[s1, s2, ...sinks]) {
  const init = ZipWith.zipWith_(s1, s2, Tp.tuple); // @ts-expect-error

  return A.reduce_(sinks, init, (acc, v) => // @ts-expect-error
  ZipWith.zipWith_(acc, v, (a, b) => Tp.append_(a, b)));
}
/**
 * @ets_data_first zip_
 */

export function zip(...[s1, ...sinks]) {
  return self => zip_(self, s1, ...sinks);
}
//# sourceMappingURL=zip.mjs.map